export function getPublishedTours(tours = []) {
  return (tours || []).filter((tour) => tour?.isPublished !== false);
}
