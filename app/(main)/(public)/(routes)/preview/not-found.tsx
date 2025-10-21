export default function NotFound() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">
          This note has been unpublished
        </h1>
        <p className="text-muted-foreground">
          {"The document you're looking for is no longer publicly available."}
        </p>
      </div>
    </div>
  );
}
