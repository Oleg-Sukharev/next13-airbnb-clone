import EmptyState from "@/app/components/EmptyState";

export default async function NotFound() {
  return (
    <EmptyState
      title="404"
      subtitle="This page could not be found."
      buttonLabel="Main page"
      showReset
    />
  )
}
