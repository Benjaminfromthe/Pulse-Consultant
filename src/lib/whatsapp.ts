export function buildWhatsAppUrl(service?: string, name?: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2348000000000'

  let message = 'Hello, I would like to schedule a consultation with Pulse Consultant Ltd.'

  if (service) {
    const serviceFormatted = service
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l: string) => l.toUpperCase())
    message = `Hello, I am interested in your ${serviceFormatted} service and would like to schedule a consultation.`
  }

  if (name) {
    message = `Hello, my name is ${name}. ${message}`
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
