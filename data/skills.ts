import { Skill } from "@/types/skills.interface";
import {IconHtml, IconCsv} from "@tabler/icons-react";

export const skills: [{ frontEnd: Skill[], backEnd: Skill[], devOps: Skill[], database: Skill[], tools: Skill[], design: Skill[], softSkills: Skill[], other: Skill[] }] = [
  {
    frontEnd: [
      {
        name: 'HTML',
        discription: "Semantic markup language for structuring web content and creating accessible web pages",
        icon: 'html.svg'
      },
      {
        name: 'CSS',
        discription: "Styling language for designing responsive and visually appealing user interfaces",
        icon: 'css.svg'
      },
      {
        name: 'JavaScript',
        discription: "Dynamic programming language for creating interactive web applications and client-side logic",
        icon: 'javascript.svg'
      },
      {
        name: 'TypeScript',
        discription: "Statically typed superset of JavaScript that enhances code quality and developer productivity",
        icon: 'typescript.svg'
      }
    ],
    backEnd: [
      {
        name: 'Node.js',
        discription: "JavaScript runtime for building scalable server-side applications and APIs",
        icon: 'nodejs.svg'
      },
      {
        name: 'Express.js',
        discription: "Minimalist web framework for Node.js, ideal for building RESTful APIs and web applications",
        icon: 'expressjs.svg'
      },
      {
        name: 'MongoDB',
        discription: "NoSQL database for flexible, document-based data storage and management",
        icon: 'mongodb.svg'
      }
    ],
    devOps: [
      {
        name: 'Docker',
        discription: "Containerization platform for packaging applications and ensuring consistent deployment across environments",
        icon: 'docker.svg'
      },
      {
        name: 'Kubernetes',
        discription: "Container orchestration system for automating deployment, scaling, and management of containerized applications",
        icon: 'kubernetes.svg'
      }
    ],
    database: [
      {
        name: 'MySQL',
        discription: "Popular relational database management system for structured data and complex queries",
        icon: 'mysql.svg'
      },
      {
        name: 'PostgreSQL',
        discription: "Advanced open-source relational database with robust features for data integrity and performance",
        icon: 'postgresql.svg'
      }
    ],
    tools: [
      {
        name: 'Git',
        discription: "Distributed version control system for tracking code changes and collaborating with teams",
        icon: 'git.svg'
      },
      {
        name: 'GitHub',
        discription: "Cloud-based platform for hosting Git repositories and managing collaborative software development",
        icon: 'github.svg'
      },
      {
        name: 'VS Code',
        discription: "Powerful code editor with extensive extensions for efficient development across multiple languages",
        icon: 'vscode.svg'
      },
      {
        name: 'Postman',
        discription: "API development and testing tool for designing, debugging, and documenting REST APIs",
        icon: 'postman.svg'
      }
    ],
    design: [
      {
        name: 'Figma',
        discription: "Collaborative interface design tool for creating wireframes, prototypes, and design systems",
        icon: 'figma.svg'
      },
      {
        name: 'Canva',
        discription: "User-friendly graphic design platform for creating visual content and marketing materials",
        icon: 'canva.svg'
      },
      {
        name: 'Photoshop',
        discription: "Professional image editing software for photo manipulation and digital artwork creation",
        icon: 'photoshop.svg'
      },
      {
        name: 'Illustrator',
        discription: "Vector graphics editor for creating logos, icons, and scalable illustrations",
        icon: 'illustrator.svg'
      }
    ],
    softSkills: [],
    other: []
  }
]