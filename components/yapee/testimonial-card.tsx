import Image from "next/image"
import type { Testimonial } from "@/lib/types"

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 mx-4">
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full border-2 border-red-500 overflow-hidden mb-4">
          <Image
            src={testimonial.avatarUrl || "/placeholder.svg?height=200&width=200"}
            alt={testimonial.name}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Quote */}
        <blockquote className="text-gray-700 dark:text-gray-300 italic mb-6">"{testimonial.quote}"</blockquote>

        {/* Author Info */}
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {testimonial.title}, {testimonial.location}
          </div>
        </div>
      </div>
    </div>
  )
}
