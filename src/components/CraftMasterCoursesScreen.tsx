import { useState } from 'react'

/**
 * Props for CraftMasterCoursesScreen component.
 * Allows parent components to receive navigation and course selection events.
 */
export interface CraftMasterCoursesScreenProps {
  onNavigate?: (tab: 'home' | 'courses' | 'my-courses') => void
  onCourseClick?: (courseId: string) => void
  onCreateCourseClick?: () => void
}

/**
 * CraftMasterCoursesScreen
 * 
 * Direct, faithful React conversion of `craft_master_courses_screen/code.html`.
 * Features:
 *  1. Top app bar with palette icon, title, stars badge (142), and notification bell
 *  2. Search bar with plus (+) action button to open Create Course screen
 *  3. Quick category filter pills (All, Origami, Ceramics, Macramé, Paper Craft, Embroidery)
 *  4. "Become a Master Host" creator banner
 *  5. 50/50 Course card list with difficulty badges (Beginner, Intermediate, Master), author, duration, and forward navigation
 *  6. Create New Course pop-up modal dialog with form inputs (Title, Difficulty, Pitch, Syllabus, Tags, Creator toggle)
 *  7. Bottom navigation bar with "Courses" highlighted as active
 */
export function CraftMasterCoursesScreen({
  onNavigate,
  onCourseClick,
  onCreateCourseClick,
}: CraftMasterCoursesScreenProps) {
  // Search query text state
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Active category filter state (default 'All')
  const [selectedFilter, setSelectedFilter] = useState<string>('All')

  // Create course modal open/close state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  // Active bottom navigation tab (defaults to 'courses' on this screen)
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'my-courses'>('courses')

  // Modal form states
  const [newTitle, setNewTitle] = useState<string>('')
  const [newDifficulty, setNewDifficulty] = useState<'beginner' | 'intermediate' | 'master'>('beginner')
  const [newPitch, setNewPitch] = useState<string>('')
  const [newContent, setNewContent] = useState<string>('')
  const [tags, setTags] = useState<string[]>(['Clay', 'Botanicals'])
  const [isCreatorBadgeOn, setIsCreatorBadgeOn] = useState<boolean>(true)

  // Quick filter categories matching original HTML
  const filterCategories = [
    'All',
    'Origami',
    'Ceramics',
    'Macramé',
    'Paper Craft',
    'Embroidery',
  ]

  // Handle bottom navigation tab switch
  const handleTabClick = (tab: 'home' | 'courses' | 'my-courses') => {
    setActiveTab(tab)
    if (onNavigate) {
      onNavigate(tab)
    }
  }

  // Handle course creation form submission
  const handlePublishCourse = (e: React.FormEvent) => {
    e.preventDefault()
    // Close modal after publishing
    setIsModalOpen(false)
    // Clear inputs
    setNewTitle('')
    setNewPitch('')
    setNewContent('')
  }

  // Remove tag helper
  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove))
  }

  return (
    // Outer Mobile Shell (max-w-[430px])
    <div className="w-full max-w-[430px] min-h-screen bg-background relative flex flex-col shadow-[0_12px_40px_rgba(110,80,60,0.12)] border-x border-outline-variant/30 sm:rounded-3xl overflow-hidden">
      
      {/* 1. Top App Bar */}
      <header className="sticky top-0 z-40 bg-surface shadow-sm transition-transform">
        <div className="flex justify-between items-center w-full px-space-md py-space-sm max-w-[430px] mx-auto">
          {/* Logo & Brand title */}
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[28px]" data-icon="palette">
              palette
            </span>
            <span className="text-headline-sm font-headline-sm font-bold text-primary tracking-tight">
              Craft Master
            </span>
          </div>

          <div className="flex items-center gap-space-xs">
            {/* Star reward badge tracker */}
            <div className="flex items-center gap-1 bg-surface-container px-space-xs py-1 rounded-full border border-outline-variant/40">
              <span
                className="material-symbols-outlined text-primary text-[18px]"
                data-icon="stars"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              <span className="text-label-md font-label-md text-primary font-bold">142</span>
            </div>

            {/* Notification button */}
            <button
              type="button"
              aria-label="Notifications"
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container transition-all active:scale-95 text-on-surface-variant cursor-pointer"
            >
              <span className="material-symbols-outlined" data-icon="notifications">
                notifications
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Content Flow */}
      <main className="flex-1 px-space-md pt-space-md pb-28 flex flex-col gap-space-lg">
        
        {/* Header Search & Create New Button */}
        <section className="flex flex-col gap-space-md">
          <div className="flex items-center gap-space-xs">
            {/* Search Input Pill */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]" data-icon="search">
                  search
                </span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crafts, stitches, clay..."
                className="w-full pl-10 pr-4 py-2.5 bg-surface text-on-surface text-body-md font-body-md rounded-full border border-outline-variant focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/60 shadow-sm transition-all"
              />
            </div>

            {/* Circular Plus (+) Button to open Create Course Screen */}
            <button
              type="button"
              id="openModalBtn"
              title="Create New Course"
              onClick={() => {
                if (onCreateCourseClick) {
                  onCreateCourseClick()
                } else {
                  setIsModalOpen(true)
                }
              }}
              className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[0_4px_14px_rgba(190,129,110,0.35)] hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]" data-icon="add">
                add
              </span>
            </button>
          </div>

          {/* Filter Pills Scrollable Row */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-space-md px-space-md">
            {filterCategories.map((filter) => {
              const isSelected = selectedFilter === filter
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-label-md font-label-md shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface text-on-surface-variant border border-outline-variant hover:bg-surface-container'
                  }`}
                >
                  {filter}
                </button>
              )
            })}
          </div>
        </section>

        {/* Interactive Banner: "Become a Master Host" */}
        <section className="bg-surface-container rounded-lg p-space-md border border-outline-variant/60 flex items-center justify-between shadow-[0_4px_14px_-2px_rgba(110,80,60,0.08)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary/20 text-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]" data-icon="auto_awesome">
                auto_awesome
              </span>
            </div>
            <div>
              <h4 className="text-label-lg font-label-lg text-on-surface leading-tight">
                Become a Master Host
              </h4>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                Launch your workshop in 3 steps
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              if (onCreateCourseClick) {
                onCreateCourseClick()
              } else {
                setIsModalOpen(true)
              }
            }}
            className="px-3 py-1.5 rounded-full bg-surface text-primary border border-primary/30 text-label-sm font-label-sm hover:bg-primary hover:text-on-primary transition-all shrink-0 cursor-pointer"
          >
            Create
          </button>
        </section>

        {/* Section Title with Course Count */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <h2 className="text-headline-md font-headline-md text-on-surface font-bold tracking-tight">
              Explore Workshops
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-label-sm font-label-sm font-bold">
              18 Courses
            </span>
          </div>
          <button
            type="button"
            className="text-tertiary flex items-center gap-0.5 text-label-md font-label-md hover:underline cursor-pointer"
          >
            <span>Sort by: Top Rated</span>
            <span className="material-symbols-outlined text-[16px]" data-icon="expand_more">
              expand_more
            </span>
          </button>
        </div>

        {/* 50/50 Square Layout Course Cards Stack */}
        <section className="flex flex-col gap-space-md">
          
          {/* Course Card 1: Ceramics */}
          <article
            onClick={() => onCourseClick && onCourseClick('ceramics')}
            className="bg-surface rounded-lg overflow-hidden border border-outline-variant shadow-[0_4px_14px_-2px_rgba(110,80,60,0.08)] hover:shadow-md transition-all flex flex-row h-44 cursor-pointer"
          >
            {/* Left 50% Image Square */}
            <div className="w-1/2 relative bg-surface-container overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Hands shaping a terracotta clay cup on a pottery wheel"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXVIFleH-dIPj6E770ZN_yvqDCTTlsQbKMdzsf6f1VrA7Qq2TQ9wrRy7y5hmpHslIX7RJF5kGYkiy717f4hBjIlIv0RA9ICqQ6I8ccgQ-t757bVpWPCCHnIqe0xLOIdZD0g6TJ222IeN8p0rQTESaIoi7NYvU50GZ17Wb8aeMeATw_M4CckPSfpBRuyx7-2QSufzhHrRsx12uMqHaLiHy-_oqxxytivJd6G8wLcC-gQs6DzuiX1TBA2A"
              />
              <div className="absolute top-2 left-2">
                <span className="px-2.5 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm text-on-surface text-label-sm font-label-sm border border-outline-variant/50">
                  Ceramics
                </span>
              </div>
            </div>

            {/* Right 50% Info Content */}
            <div className="w-1/2 p-3.5 flex flex-col justify-between bg-surface">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-sm font-label-sm font-bold inline-flex items-center gap-1">
                    Beginner
                    <span className="inline-flex items-center text-primary text-[11px] font-bold">
                      <span className="material-symbols-outlined text-[13px]" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>{' '}
                      2
                    </span>
                  </span>
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface line-clamp-2 leading-tight">
                  Handbuilt Pinch Pots &amp; Vessels
                </h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary" data-icon="person">
                    person
                  </span>
                  Aria Thorne
                </p>
              </div>
              <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between">
                <span className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[13px]" data-icon="schedule">
                    schedule
                  </span>{' '}
                  45m
                </span>
                <button
                  type="button"
                  aria-label="View course"
                  className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]" data-icon="arrow_forward">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </article>

          {/* Course Card 2: Macramé */}
          <article
            onClick={() => onCourseClick && onCourseClick('macrame')}
            className="bg-surface rounded-lg overflow-hidden border border-outline-variant shadow-[0_4px_14px_-2px_rgba(110,80,60,0.08)] hover:shadow-md transition-all flex flex-row h-44 cursor-pointer"
          >
            {/* Left 50% Image Square */}
            <div className="w-1/2 relative bg-surface-container overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Intricate macramé woven plant hanger from natural unbleached cord"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLaW7HeLwxna_BWHbEk2C8VUTJCNV_GTvfdk32_igR6ZlShe5PZk1fsXjCQbxSUlq96KeP0RUz85SVUCD8eCsrjb1z6rvWlG_Qy7E0BYKTBt5lC0oIRD3OOC1kBgP8j017bjWw9nsj-eGYLqo0bhFozU5ZMEUYR73Njg-AGjzUdO6BSgjaPZZau9w49CyflhnoFp-EkiT190EumhPCZG7GJUlQic22IT1pA2pVIyHnaQSq7koRW7779A"
              />
              <div className="absolute top-2 left-2">
                <span className="px-2.5 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm text-on-surface text-label-sm font-label-sm border border-outline-variant/50">
                  Macramé
                </span>
              </div>
            </div>

            {/* Right 50% Info Content */}
            <div className="w-1/2 p-3.5 flex flex-col justify-between bg-surface">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-label-sm font-label-sm font-bold inline-flex items-center gap-1">
                    Intermediate
                    <span className="inline-flex items-center text-primary text-[11px] font-bold">
                      <span className="material-symbols-outlined text-[13px]" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>{' '}
                      5
                    </span>
                  </span>
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface line-clamp-2 leading-tight">
                  Boho Tapestry &amp; Lark Head Knots
                </h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary" data-icon="person">
                    person
                  </span>
                  Kaelen Voss
                </p>
              </div>
              <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between">
                <span className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[13px]" data-icon="schedule">
                    schedule
                  </span>{' '}
                  1h 20m
                </span>
                <button
                  type="button"
                  aria-label="View course"
                  className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]" data-icon="arrow_forward">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </article>

          {/* Course Card 3: Origami */}
          <article
            onClick={() => onCourseClick && onCourseClick('origami')}
            className="bg-surface rounded-lg overflow-hidden border border-outline-variant shadow-[0_4px_14px_-2px_rgba(110,80,60,0.08)] hover:shadow-md transition-all flex flex-row h-44 cursor-pointer"
          >
            {/* Left 50% Image Square */}
            <div className="w-1/2 relative bg-surface-container overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Complex 3D geometric paper origami sculpture"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_dAUOyxDxiAbUK4Js3SbLbVR773661genj2GPqCeepAyUZhEFCoT9hZyAAkd2O4PILhLI4I1TYVYat7il042jNcCLeU21I9ygtL5qg9l3gaNOQzqMaAjAIVkSOuRfm9F6t_vOF1SbwSYGnj_0RNWxNuz8Hpj6bDbczon66hNmpi76p75_xWZPNDrOzvOEP7Aa40UOvmJ0i8P5ybp9UqrYXDj0MR0QnJS_ehyA05FeETa5HrLEAZSWVg"
              />
              <div className="absolute top-2 left-2">
                <span className="px-2.5 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm text-on-surface text-label-sm font-label-sm border border-outline-variant/50">
                  Origami
                </span>
              </div>
            </div>

            {/* Right 50% Info Content */}
            <div className="w-1/2 p-3.5 flex flex-col justify-between bg-surface">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-label-sm font-label-sm font-bold inline-flex items-center gap-1">
                    Master
                    <span className="inline-flex items-center text-primary text-[11px] font-bold">
                      <span className="material-symbols-outlined text-[13px]" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>{' '}
                      8
                    </span>
                  </span>
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface line-clamp-2 leading-tight">
                  Modular Polyhedra &amp; Tessellations
                </h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary" data-icon="person">
                    person
                  </span>
                  Kenji Sato
                </p>
              </div>
              <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between">
                <span className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[13px]" data-icon="schedule">
                    schedule
                  </span>{' '}
                  2h 45m
                </span>
                <button
                  type="button"
                  aria-label="View course"
                  className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]" data-icon="arrow_forward">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </article>

          {/* Course Card 4: Embroidery */}
          <article
            onClick={() => onCourseClick && onCourseClick('embroidery')}
            className="bg-surface rounded-lg overflow-hidden border border-outline-variant shadow-[0_4px_14px_-2px_rgba(110,80,60,0.08)] hover:shadow-md transition-all flex flex-row h-44 cursor-pointer"
          >
            {/* Left 50% Image Square */}
            <div className="w-1/2 relative bg-surface-container overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Wooden embroidery hoop framing wild meadow botanical stitches"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwWfQIUIrOI6Xrb9H2wZ0bYgrlpZJlRStn4NUDS0o6y0G4vrN5nv4vW05d6d4aanDzxXJmzAvgOuJjElu6sKsai3CqFRT-MLNEfVp7TAgdIFFvWbaO6BmmJP8vfUmqtzvKspmEsMPbz1kV8NwlmqPHj5HOnUFINR6vHZk6OhlFMiDRixKqmHOhwnsVxYBMSlxbhEd64zF1ceQ6f0dMKEt694tT2ughFx2A2_hDlxj_AZAIZgQwNGu0zQ"
              />
              <div className="absolute top-2 left-2">
                <span className="px-2.5 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm text-on-surface text-label-sm font-label-sm border border-outline-variant/50">
                  Embroidery
                </span>
              </div>
            </div>

            {/* Right 50% Info Content */}
            <div className="w-1/2 p-3.5 flex flex-col justify-between bg-surface">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-sm font-label-sm font-bold inline-flex items-center gap-1">
                    Beginner
                    <span className="inline-flex items-center text-primary text-[11px] font-bold">
                      <span className="material-symbols-outlined text-[13px]" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>{' '}
                      2
                    </span>
                  </span>
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface line-clamp-2 leading-tight">
                  Wild Flora Hoops &amp; Satin Stitch
                </h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary" data-icon="person">
                    person
                  </span>
                  Mila Rosales
                </p>
              </div>
              <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between">
                <span className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[13px]" data-icon="schedule">
                    schedule
                  </span>{' '}
                  55m
                </span>
                <button
                  type="button"
                  aria-label="View course"
                  className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]" data-icon="arrow_forward">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </article>

        </section>

      </main>

      {/* 3. Create Course Pop-up Modal */}
      {isModalOpen && (
        <div
          id="createCourseModal"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-on-surface/40 backdrop-blur-xs transition-opacity"
        >
          <div className="w-full max-w-[430px] bg-surface rounded-t-xl sm:rounded-xl border border-outline-variant shadow-2xl p-space-lg flex flex-col gap-space-md max-h-[795px] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]" data-icon="edit_note">
                    edit_note
                  </span>
                </div>
                <div>
                  <h3 className="text-headline-sm font-headline-sm font-bold text-on-surface">
                    Create New Course
                  </h3>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">
                    Fill in the mandatory workshop details
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]" data-icon="close">
                  close
                </span>
              </button>
            </div>

            {/* Mandatory Fields Form */}
            <form onSubmit={handlePublishCourse} className="flex flex-col gap-space-sm">
              {/* Field 1: Title */}
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-label-md text-on-surface flex items-center justify-between">
                  <span>
                    Title <span className="text-primary">*</span>
                  </span>
                  <span className="text-label-sm font-label-sm text-on-surface-variant/60">Required</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Master Botanical Ceramic Stamps"
                  className="w-full px-3.5 py-2.5 rounded-DEFAULT bg-surface-container-lowest border border-outline-variant text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Field 2: Difficulty Level */}
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-label-md text-on-surface">
                  Difficulty <span className="text-primary">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <label
                    onClick={() => setNewDifficulty('beginner')}
                    className={`cursor-pointer border rounded-DEFAULT p-2 flex flex-col items-center gap-1 bg-surface-container-lowest transition-all ${
                      newDifficulty === 'beginner' ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant hover:border-primary'
                    }`}
                  >
                    <span className="text-label-sm font-label-sm text-on-surface font-bold">Beginner</span>
                    <span className="text-[11px] font-bold text-primary flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>{' '}
                      2
                    </span>
                  </label>

                  <label
                    onClick={() => setNewDifficulty('intermediate')}
                    className={`cursor-pointer border rounded-DEFAULT p-2 flex flex-col items-center gap-1 bg-surface-container-lowest transition-all ${
                      newDifficulty === 'intermediate' ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant hover:border-primary'
                    }`}
                  >
                    <span className="text-label-sm font-label-sm text-on-surface font-bold">Intermediate</span>
                    <span className="text-[11px] font-bold text-primary flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>{' '}
                      5
                    </span>
                  </label>

                  <label
                    onClick={() => setNewDifficulty('master')}
                    className={`cursor-pointer border rounded-DEFAULT p-2 flex flex-col items-center gap-1 bg-surface-container-lowest transition-all ${
                      newDifficulty === 'master' ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant hover:border-primary'
                    }`}
                  >
                    <span className="text-label-sm font-label-sm text-on-surface font-bold">Master</span>
                    <span className="text-[11px] font-bold text-primary flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>{' '}
                      8
                    </span>
                  </label>
                </div>
              </div>

              {/* Field 3: Intro Pitch */}
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-label-md text-on-surface flex items-center justify-between">
                  <span>
                    Intro Pitch <span className="text-primary">*</span>
                  </span>
                  <span className="text-label-sm font-label-sm text-on-surface-variant/60">Short summary</span>
                </label>
                <input
                  type="text"
                  required
                  value={newPitch}
                  onChange={(e) => setNewPitch(e.target.value)}
                  placeholder="A gentle 30-minute creative sanctuary for beginners..."
                  className="w-full px-3.5 py-2.5 rounded-DEFAULT bg-surface-container-lowest border border-outline-variant text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Field 4: Course Content & Modules */}
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-label-md text-on-surface">
                  Course Content &amp; Modules <span className="text-primary">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Outline steps, clay preparation, carving techniques..."
                  className="w-full px-3.5 py-2 rounded-DEFAULT bg-surface-container-lowest border border-outline-variant text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                ></textarea>
              </div>

              {/* Field 5: Tags */}
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-label-md text-on-surface">
                  Tags <span className="text-primary">*</span>
                </label>
                <div className="flex flex-wrap gap-1.5 mb-1">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-surface-container text-on-surface-variant rounded-full text-label-sm font-label-sm flex items-center gap-1 border border-outline-variant/50"
                    >
                      {tag}
                      <span
                        onClick={() => removeTag(tag)}
                        className="material-symbols-outlined text-[12px] cursor-pointer hover:text-primary"
                        data-icon="close"
                      >
                        close
                      </span>
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const tag = prompt('Enter a new tag name:')
                      if (tag && !tags.includes(tag)) {
                        setTags([...tags, tag])
                      }
                    }}
                    className="px-2.5 py-1 bg-surface-container-lowest text-primary rounded-full text-label-sm font-label-sm border border-dashed border-primary/50 cursor-pointer hover:bg-primary/5"
                  >
                    + Add Tag
                  </button>
                </div>
              </div>

              {/* Field 6: Creator Toggle */}
              <div className="p-3 bg-surface-container rounded-DEFAULT border border-outline-variant flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-label-md font-label-md text-on-surface">Creator Profile Badge</span>
                  <span className="text-label-sm font-label-sm text-on-surface-variant">Feature on public community feed</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCreatorBadgeOn}
                    onChange={(e) => setIsCreatorBadgeOn(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-full border border-outline-variant bg-surface text-on-surface font-label-md text-label-md hover:bg-surface-container transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-[0_6px_18px_rgba(190,129,110,0.28)] hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                >
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 w-full z-50 flex justify-around items-center px-space-md py-space-xs max-w-[430px] mx-auto bg-surface shadow-lg">
        {/* Home (Inactive) */}
        <button
          type="button"
          onClick={() => handleTabClick('home')}
          className={`flex flex-col items-center justify-center px-space-md py-space-xs transition-all duration-200 cursor-pointer ${
            activeTab === 'home'
              ? 'bg-primary text-on-primary rounded-full'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            data-icon="home"
            style={{ fontVariationSettings: activeTab === 'home' ? "'FILL' 1" : "'FILL' 0" }}
          >
            home
          </span>
          <span className="text-label-sm font-label-sm mt-0.5">Home</span>
        </button>

        {/* Courses (ACTIVE - Red Brick Pill Highlight) */}
        <button
          type="button"
          onClick={() => handleTabClick('courses')}
          className={`flex flex-col items-center justify-center px-space-md py-space-xs transition-all duration-200 cursor-pointer ${
            activeTab === 'courses'
              ? 'bg-primary text-on-primary rounded-full'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            data-icon="grid_view"
            style={{ fontVariationSettings: activeTab === 'courses' ? "'FILL' 1" : "'FILL' 0" }}
          >
            grid_view
          </span>
          <span className="text-label-sm font-label-sm mt-0.5">Courses</span>
        </button>

        {/* My Courses (Inactive) */}
        <button
          type="button"
          onClick={() => handleTabClick('my-courses')}
          className={`flex flex-col items-center justify-center px-space-md py-space-xs transition-all duration-200 cursor-pointer ${
            activeTab === 'my-courses'
              ? 'bg-primary text-on-primary rounded-full'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            data-icon="auto_stories"
            style={{ fontVariationSettings: activeTab === 'my-courses' ? "'FILL' 1" : "'FILL' 0" }}
          >
            auto_stories
          </span>
          <span className="text-label-sm font-label-sm mt-0.5">My Courses</span>
        </button>
      </nav>

    </div>
  )
}

