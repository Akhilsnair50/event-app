export default function EventAbout({ description }: { description: string }) {
  // Clean and convert all literal "\n" into <br />
  const normalized = description.replace(/\\n/g, '<br />');

  return (
    <section className="event-about">
      <h3>About</h3>
      <div
        className="event-description"
        dangerouslySetInnerHTML={{ __html: normalized }}
      />
    </section>
  );
}
