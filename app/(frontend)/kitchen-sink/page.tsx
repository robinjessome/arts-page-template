export default async function Page() {
  return (
    <>
      <p>Content...</p>
      <div className="grid grid-cols-5 *:h-32 *:w-full">
        <div className="bg-primary-lightest" />
        <div className="bg-primary-light" />
        <div className="bg-primary" />
        <div className="from-primary to-secondary row-span-2 h-full! bg-linear-to-b" />
        <div className="from-primary to-accent row-span-2 h-full! bg-linear-to-b" />
        <div className="bg-primary-dark" />
        <div className="bg-accent" />
        <div className="bg-secondary" />
      </div>
    </>
  )
}
