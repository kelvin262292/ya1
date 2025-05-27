import { cn } from "@/lib/utils"
import { CheckCircle, AlertCircle } from "lucide-react"

interface ToastProps {
  message: string
  type: "success" | "error"
  visible: boolean
}

export function Toast({ message, type, visible }: ToastProps) {
  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] max-w-md p-4 rounded-lg shadow-lg transition-all duration-500 transform",
        type === "success" ? "bg-green-500" : "bg-red-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none",
      )}
    >
      <div className="flex items-center space-x-3 text-white">
        {type === "success" ? (
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
        ) : (
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
        )}
        <p>{message}</p>
      </div>
    </div>
  )
}
