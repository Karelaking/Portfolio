import { SocialForm } from '@/components/dashboard/socials-form'

export default function NewSocialPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">New Social Link</h1>
      <SocialForm />
    </div>
  )
}
