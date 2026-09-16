interface AlertBannerProps {
  message: string
}

export function AlertBanner({ message }: AlertBannerProps) {
  return (
    <div role="alert" className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
      {message}
    </div>
  )
}
