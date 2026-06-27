import type mongoose from "mongoose";
import { model, models, Schema } from "mongoose";
import { connectMongo } from "@/lib/database/mongodb";
import type { ActionResult } from "@/types/action-result.interface";
import type { ProjectItem } from "@/types/project-item.interface";
import type { ProjectRowInput } from "@/types/project-row-input.interface";
import type {
	CreateProjectInput,
	DeleteProjectInput,
	ProjectFetchAllResult,
	ProjectRepository,
	UpdateProjectInput,
} from "@/types/repositories/project-repository.interface";

interface TechnologyLookupRow {
	_id?: mongoose.Types.ObjectId;
	id?: string;
	slug: string;
}

interface ProjectDocument extends ProjectRowInput {
	id: string;
	order_index: number;
}

interface ProjectTechnologyDocument {
	project_id: string;
	technology_id: string;
}

const projectSchema = new Schema<ProjectDocument>(
	{
		id: { type: String, required: true, unique: true, index: true },
		name: { type: String, required: true },
		description: { type: String, required: true },
		tags: { type: [String], default: [] },
		image_src: { type: String, required: true },
		image_alt: { type: String, required: true },
		href: { type: String, required: true },
		order_index: { type: Number, required: true, default: 0 },
	},
	{
		collection: "projects",
		versionKey: false,
	}
);

const technologySchema = new Schema<TechnologyLookupRow>(
	{
		id: { type: String },
		slug: { type: String, required: true },
	},
	{
		collection: "technologies",
		versionKey: false,
	}
);

const projectTechnologySchema = new Schema<ProjectTechnologyDocument>(
	{
		project_id: { type: String, required: true, index: true },
		technology_id: { type: String, required: true, index: true },
	},
	{
		collection: "project_technologies",
		versionKey: false,
	}
);

const ProjectModel =
	(models.Project as mongoose.Model<ProjectDocument>) ||
	model<ProjectDocument>("Project", projectSchema);
const TechnologyModel =
	(models.Technology as mongoose.Model<TechnologyLookupRow>) ||
	model<TechnologyLookupRow>("Technology", technologySchema);
const ProjectTechnologyModel =
	(models.ProjectTechnology as mongoose.Model<ProjectTechnologyDocument>) ||
	model<ProjectTechnologyDocument>(
		"ProjectTechnology",
		projectTechnologySchema
	);

const normalizeTechnologyValue = (value: string): string =>
	value.toLowerCase().replaceAll(/[^a-z0-9]/g, "");

const getMatchingTechnologyIds = (
	technologies: TechnologyLookupRow[],
	projectTags: string[]
): string[] => {
	const normalizedTags = projectTags.map(normalizeTechnologyValue);

	return technologies
		.filter((technology) => {
			const normalizedSlug = normalizeTechnologyValue(technology.slug);

			return normalizedTags.some(
				(tag) => tag.includes(normalizedSlug) || normalizedSlug.includes(tag)
			);
		})
		.map((technology) => technology.id)
		.filter((id): id is string => typeof id === "string" && id.length > 0);
};

const mapProjectRowToItem = (
	row: ProjectRowInput & { id: string }
): ProjectItem => ({
	id: row.id,
	name: row.name,
	description: row.description,
	tags: Array.isArray(row.tags) ? row.tags : [],
	imageSrc: row.image_src,
	imageAlt: row.image_alt,
	href: row.href,
});

export class ProjectRepositoryImpl implements ProjectRepository {
	private async ensureConnection(): Promise<void> {
		await connectMongo();
	}

	private async syncProjectTechnologies(
		projectId: string,
		projectTags: string[]
	): Promise<string | null> {
		try {
			await this.ensureConnection();

			const technologies = await TechnologyModel.find(
				{},
				{
					id: 1,
					slug: 1,
				}
			).lean();

			await ProjectTechnologyModel.deleteMany({
				project_id: projectId,
			});

			if (!technologies || technologies.length === 0) {
				return null;
			}

			const matchedTechnologyIds = getMatchingTechnologyIds(
				technologies.map((technology) => ({
					id: technology.id ?? String(technology._id ?? ""),
					slug: technology.slug,
				})),
				projectTags
			);

			if (matchedTechnologyIds.length === 0) {
				return null;
			}

			const relationRows = matchedTechnologyIds.map((technologyId) => ({
				project_id: projectId,
				technology_id: technologyId,
			}));

			await ProjectTechnologyModel.insertMany(relationRows);

			return null;
		} catch (error) {
			return error instanceof Error
				? error.message
				: "Failed to synchronize project technologies.";
		}
	}

	async getAll(): Promise<ProjectFetchAllResult> {
		try {
			await this.ensureConnection();

			const rows = await ProjectModel.find(
				{},
				{
					id: 1,
					name: 1,
					description: 1,
					tags: 1,
					image_src: 1,
					image_alt: 1,
					href: 1,
				}
			)
				.sort({ order_index: 1 })
				.lean();

			return {
				projects: rows.map(mapProjectRowToItem),
			};
		} catch (error) {
			return {
				projects: [],
				error: error instanceof Error ? error.message : "Database error.",
			};
		}
	}

	async getById(id: string): Promise<ProjectItem | null> {
		try {
			await this.ensureConnection();

			const row = await ProjectModel.findOne(
				{ id },
				{
					id: 1,
					name: 1,
					description: 1,
					tags: 1,
					image_src: 1,
					image_alt: 1,
					href: 1,
				}
			).lean();

			if (!row) {
				return null;
			}

			return mapProjectRowToItem(row);
		} catch {
			return null;
		}
	}

	async create(input: CreateProjectInput): Promise<ActionResult> {
		try {
			await this.ensureConnection();

			const payload: ProjectDocument = {
				id: input.id,
				...input.data,
				order_index: 0,
			};

			await ProjectModel.create(payload);

			const relationError = await this.syncProjectTechnologies(
				input.id,
				input.data.tags
			);

			if (relationError) {
				return { ok: false, error: relationError };
			}

			return { ok: true };
		} catch (error) {
			return {
				ok: false,
				error:
					error instanceof Error ? error.message : "Failed to create project.",
			};
		}
	}

	async update(input: UpdateProjectInput): Promise<ActionResult> {
		try {
			await this.ensureConnection();

			await ProjectModel.updateOne(
				{ id: input.id },
				{
					$set: {
						...input.data,
					},
				}
			);

			const relationError = await this.syncProjectTechnologies(
				input.id,
				input.data.tags
			);

			if (relationError) {
				return { ok: false, error: relationError };
			}

			return { ok: true };
		} catch (error) {
			return {
				ok: false,
				error:
					error instanceof Error ? error.message : "Failed to update project.",
			};
		}
	}

	async delete(input: DeleteProjectInput): Promise<ActionResult> {
		try {
			await this.ensureConnection();

			await ProjectModel.deleteOne({ id: input.id });
			await ProjectTechnologyModel.deleteMany({ project_id: input.id });

			return { ok: true };
		} catch (error) {
			return {
				ok: false,
				error:
					error instanceof Error ? error.message : "Failed to delete project.",
			};
		}
	}
}
