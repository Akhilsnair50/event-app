interface VenueSectionProps {
  location: string
  locationType: string
}

export default function VenueSection({ location, locationType }: VenueSectionProps) {
  const isTBA = locationType.toLowerCase() === 'tba'

  return (
    <section className="event-venue">
      <h3>Venue</h3>
      <p><strong>{location}</strong></p>

      {isTBA ? (
        <p className="tba-message">Venue details will be announced soon.</p>
      ) : (
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          width="100%"
          height="200"
          style={{ border: 0 }}
          loading="lazy"
        />
      )}

      <div className="organizer">
        {/* <p>City Music Festival Ltd. – 23 Events Conducted</p> */}
        {/* <button>Contact Host</button> */}
      </div>
    </section>
  )
}
