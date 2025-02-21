import { Loader } from "lucide-react"

export default function LoadingSpinner() {
  return (
    <div className="w-screen h-screen bg-green-800 flex content-center items-center">
      <Loader className="animate-spin mx-auto text-white" size={50}/>
    </div>
  )
}
