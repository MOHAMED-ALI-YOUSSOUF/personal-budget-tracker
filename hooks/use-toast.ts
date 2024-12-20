import { Toast, ToasterToast } from "@/components/ui/toast"
import {
  useToast as useToastBase,
  type ToastActionElement,
} from "@/components/ui/use-toast"

export type ToastProps = ToasterToast & {
  action?: ToastActionElement
}

export function useToast() {
  const { toast, ...rest } = useToastBase()

  return {
    toast: (props: Toast) => {
      toast(props)
    },
    ...rest,
  }
}