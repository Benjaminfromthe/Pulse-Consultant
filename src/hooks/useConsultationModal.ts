import { useState, useCallback } from 'react'

export function useConsultationModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [defaultTab, setDefaultTab] = useState<'book' | 'inquiry'>('book')
  const [prefilledService, setPrefilledService] = useState<string | undefined>()

  const openModal = useCallback((tab: 'book' | 'inquiry' = 'book', service?: string) => {
    setDefaultTab(tab)
    setPrefilledService(service)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => setIsOpen(false), [])

  return { isOpen, defaultTab, prefilledService, openModal, closeModal }
}
