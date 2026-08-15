import Card from '../components/ui/Card.jsx'

/** Halaman placeholder untuk fitur yang belum dibangun. */
export default function PlaceholderPage({ title }) {
  return (
    <Card>
      <div className="p-10 text-center">
        <h2 className="mb-2 text-lg font-bold">{title}</h2>
        <p className="text-sm text-ink-2">Halaman ini sedang dalam pengembangan.</p>
      </div>
    </Card>
  )
}
