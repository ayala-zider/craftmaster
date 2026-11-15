import { useState } from 'react'

/**
 * Props for CraftMasterCourseInsite component.
 * Allows parent components (like App.tsx) to provide navigation callbacks.
 */
export interface CraftMasterCourseInsiteProps {
  onBack?: () => void
  onComplete?: () => void
}

/**
 * CraftMasterCourseInsite
 * 
 * Direct, faithful React conversion of `craft_master_course_insite/code.html`.
 * Represents the detailed step-by-step course insight/lesson view:
 *  1. Sticky top bar with back navigation, series tag, and star rewards
 *  2. Course hero with creator profile, difficulty badge, and time/level attributes
 *  3. Community Makes photo gallery (4 shared projects)
 *  4. Interactive Materials Checklist (interactive checkboxes)
 *  5. Step-by-Step Instructions flow with active step highlight & tips
 *  6. Completion celebration module with photo sharing action
 *  7. Bottom persistent learning checkpoint action bar
 */
export function CraftMasterCourseInsite({
  onBack,
  onComplete,
}: CraftMasterCourseInsiteProps) {
  // Bookmark state for saving the lesson
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)

  // Interactive state for materials checklist
  const [materials, setMaterials] = useState([
    { id: 1, label: 'Natural 4mm Cotton Cord (8 x 3 meters)', category: 'Rope', checked: true },
    { id: 2, label: 'Solid Birch Wooden Ring (6cm diameter)', category: 'Hardware', checked: true },
    { id: 3, label: 'Sharp Craft Fabric Shears', category: 'Tool', checked: true },
    { id: 4, label: 'Medium Terracotta Pot (12-15cm wide)', category: 'Plant Vessel', checked: true },
  ])

  // Toggle checklist items
  const toggleMaterial = (id: number) => {
    setMaterials((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    )
  }

  // Count gathered materials
  const gatheredCount = materials.filter((m) => m.checked).length

  return (
    // Main Mobile Canvas Container (matching max-w-[430px])
    <main className="w-full max-w-[430px] bg-background min-h-screen relative shadow-2xl overflow-hidden flex flex-col sm:rounded-3xl">
      
      {/* 1. Top Floating Header Bar */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md px-space-md py-space-sm flex items-center justify-between ambient-shadow">
        <div className="flex items-center gap-space-xs">
          <button
            aria-label="Go back to courses"
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary active:scale-95 transition-transform duration-150 hover:bg-surface-container-high cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-primary font-bold">
              arrow_back
            </span>
          </button>
          <div className="flex flex-col">
            <span className="text-label-sm font-label-sm text-secondary uppercase tracking-wider">
              Macramé Series #04
            </span>
            <span className="text-headline-sm font-headline-sm text-on-surface truncate max-w-[210px] leading-tight">
              Cozy Plant Hanger
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-2xs">
          {/* Bookmark quick action */}
          <button
            aria-label="Bookmark lesson"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 transition-all cursor-pointer"
            type="button"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
            >
              bookmark
            </span>
          </button>

          {/* Stars Level indicator pill */}
          <div className="flex items-center gap-1 bg-surface-container-high px-space-xs py-1 rounded-full text-primary font-bold">
            <span
              className="material-symbols-outlined text-primary text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
            <span className="text-label-sm font-label-sm">480</span>
          </div>
        </div>
      </header>

      {/* 2. Scrollable Lesson Content Body */}
      <div className="flex-1 px-space-md pt-space-md pb-32 space-y-space-xl">
        
        {/* Course Hero & Metadata Card */}
        <section className="bg-surface-container-lowest rounded-lg p-space-md ambient-shadow space-y-space-sm border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-secondary font-bold text-label-md">
                NC
              </div>
              <div>
                <p className="text-label-md font-label-md text-on-surface">Created by Noa Crafty</p>
                <p className="text-body-sm font-body-sm text-secondary">Fibre Artist &amp; Botanical Stylist</p>
              </div>
            </div>
            <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-secondary text-label-sm font-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                eco
              </span>
              Beginner
            </span>
          </div>

          <div>
            <h1 className="text-headline-md font-headline-md text-on-surface tracking-tight mb-space-2xs">
              Cozy Macramé Plant Hanger
            </h1>
            <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
              Welcome to your sunlit studio moment! We’ll transform single-twist natural cotton string into a supportive, organic nest for your favourite terracotta pot using foundational square knots and delicate spiral twists.
            </p>
          </div>

          {/* Course Quick Attributes */}
          <div className="grid grid-cols-3 gap-space-2xs pt-space-xs">
            <div className="bg-surface-container rounded-xl p-space-xs text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-sm mb-0.5">schedule</span>
              <span className="text-label-sm font-label-sm text-on-surface-variant">Time</span>
              <span className="text-label-md font-label-md text-on-surface">45 Mins</span>
            </div>
            <div className="bg-surface-container rounded-xl p-space-xs text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-sm mb-0.5">qr_code_2</span>
              <span className="text-label-sm font-label-sm text-on-surface-variant">Level</span>
              <span className="text-label-md font-label-md text-on-surface">Foundations</span>
            </div>
            <div className="bg-surface-container rounded-xl p-space-xs text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-sm mb-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
              </span>
              <span className="text-label-sm font-label-sm text-on-surface-variant">Reward</span>
              <span className="text-label-md font-label-md text-primary">+2 Stars</span>
            </div>
          </div>
        </section>

        {/* Community Finished Projects Gallery (Row of 4) */}
        <section className="space-y-space-xs">
          <div className="flex items-center justify-between px-space-2xs">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                photo_library
              </span>
              <h2 className="text-headline-sm font-headline-sm text-on-surface">Community Makes</h2>
            </div>
            <span className="text-label-sm font-label-sm text-secondary flex items-center">
              48 Shared This Week
            </span>
          </div>

          {/* 4 community photos */}
          <div className="grid grid-cols-4 gap-space-xs">
            {/* Card 1 */}
            <div className="group relative rounded-xl overflow-hidden bg-surface-container-high border border-outline-variant/40 aspect-square ambient-shadow">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                alt="Macramé plant hanger suspended against warm peach plaster wall"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_yH2vLkxuMnxmJMSiUd6LOrUw1xnvoGEhB-kZQRrApumU6DFvEpbnxh6ooecRkNsK4K6-Le2d6HAuK9zB1lP-0oZF-N1WX0cjoGza4L8hZmGOO5aRRMavtXhoGxSu5vTOb7R-2kYWLO6_o4c2A8AZ8dKlORpuDjH6nqCuFA8NW84ZXpinFDPkzqftvkCUxQkz7540qkqQbaCjoecBQBYwC0ziDkrz6v8CzAMnwYKw7raMSyDQSJqwgA"
              />
              <span className="absolute bottom-1 right-1 bg-surface/90 text-on-surface text-[9px] px-1 rounded-full font-label-sm">
                @clara
              </span>
            </div>

            {/* Card 2 */}
            <div className="group relative rounded-xl overflow-hidden bg-surface-container-high border border-outline-variant/40 aspect-square ambient-shadow">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                alt="Close-up detail shot of artisan macramé plant hanger against sage green door"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC15398F9ntFRHsGnHMoHNGOIdBNCpH2R-HBasqKgrD5XJhbCC7dk7j2sYoBl0Y_ijcG-Yoxzd4lrQ_45QlfJF58YuugCiRQhwBgQNvbHcCPMZrXI8SebynA95EkwMbHDH9Zyjxpyroka0W3FHx8Q_rGurZb-bSSuuVBqQv2a8Z4uj6gsKbBNEOQ3e3cHiN28It6wzJ5Ck9zOwm8-xY_km6TgcUEvKnKwqBu14nRM8RrQZmVIp61hHH2A"
              />
              <span className="absolute bottom-1 right-1 bg-surface/90 text-on-surface text-[9px] px-1 rounded-full font-label-sm">
                @elena
              </span>
            </div>

            {/* Card 3 */}
            <div className="group relative rounded-xl overflow-hidden bg-surface-container-high border border-outline-variant/40 aspect-square ambient-shadow">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                alt="Bright window vignette showing handmade bohemian macramé plant hanger"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2uPm_gLXpdlFsU8Gh3isIWDDZhIM0MHCy13-EhSPikH4TMiSIrQYNSIqjXeJkk0RuLm52z3L3sSXcaVrszHvYENNDO7BlH6gKoty81vlQeusqB9jGvSWcim1i9fs0S_uFXDAjP6CxpoQcTOog7cG3Q6hCv_ngEkNKuqGgQcy4HXD8jz82wGEGfRZhfWqFQMzerVMBMjuyvzUah1YH60iNoE_If1BsunMI2pxl-OflsGcuNIljekFuTw"
              />
              <span className="absolute bottom-1 right-1 bg-surface/90 text-on-surface text-[9px] px-1 rounded-full font-label-sm">
                @mateo
              </span>
            </div>

            {/* Card 4 */}
            <div className="group relative rounded-xl overflow-hidden bg-surface-container-high border border-outline-variant/40 aspect-square ambient-shadow">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                alt="Overhead lifestyle photo of completed macramé hanger arranged flat on linen table"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTg9-gW5ohNbBdEfVotjz-Kh768ba3NAjVTdUcFcX0IjTC3i3jXA_a_HpbZK-9rzTlpF43gLAb_Ii5zDv4awJLbRh8thMzXE8_mHxrFXaYO5Ea852b86m4H9WHWER9Ata7jf90Ia5sW9vg1NCJYpaRMuWDPFdQIo8EsaDEMYnduOSgytZrZU3Z-wSrGn9yEPOcohDIeXZ7gv3d1gf1MSMISAzGqLoIW28LhKAg6v5imOMzUStiir5jwA"
              />
              <span className="absolute bottom-1 right-1 bg-surface/90 text-on-surface text-[9px] px-1 rounded-full font-label-sm">
                @hannah
              </span>
            </div>
          </div>
        </section>

        {/* Materials Checklist Module */}
        <section className="bg-surface-container-low rounded-lg p-space-md border border-outline-variant/40 space-y-space-sm ambient-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">inventory_2</span>
              <h2 className="text-headline-sm font-headline-sm text-on-surface">Materials Checklist</h2>
            </div>
            <span className="text-label-sm font-label-sm text-secondary bg-secondary-container px-2 py-0.5 rounded-full">
              {gatheredCount} / {materials.length} Gathered
            </span>
          </div>

          <div className="space-y-space-2xs text-body-md font-body-md">
            {materials.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-space-xs p-2.5 rounded-2xl bg-surface hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/20"
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleMaterial(item.id)}
                  className="w-5 h-5 rounded-lg text-primary focus:ring-primary/20 border-outline-variant cursor-pointer"
                />
                <span className={`text-on-surface flex-1 ${item.checked ? '' : 'text-on-surface-variant'}`}>
                  {item.label}
                </span>
                <span className="text-label-sm font-label-sm text-secondary">{item.category}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Step-by-Step Instructions Flow */}
        <section className="space-y-space-lg">
          <div className="flex items-center justify-between px-space-2xs">
            <h2 className="text-headline-sm font-headline-sm text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary">format_list_numbered</span>
              Step-by-Step Instructions
            </h2>
            <span className="text-label-sm font-label-sm text-on-surface-variant">Step 2 of 4 Active</span>
          </div>

          {/* Step 1: Completed */}
          <article className="bg-surface-container-lowest rounded-lg p-space-md border border-outline-variant/30 ambient-shadow space-y-space-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-label-sm font-label-sm">
                  <span className="material-symbols-outlined text-sm">check</span>
                </span>
                <span className="text-headline-sm font-headline-sm text-on-surface">
                  01. Mounting &amp; Gathering Knot
                </span>
              </div>
              <span className="text-label-sm font-label-sm text-secondary font-bold">Completed</span>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
              Thread all eight 3-meter cord strands evenly through the birch ring so they fold in half, leaving sixteen equal strands dangling 1.5 meters each. Wrap your separate gathering cord around all bundles using a secure wrap knot.
            </p>
            <div className="h-44 rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container">
              <img
                className="w-full h-full object-cover"
                alt="Detailed instructional craft photo of natural rope being secured to a birch wood ring"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTJ49sOupcx_oxifMm7HOZWeC3n9550uMZescRyuP6iP2bBTpvhTVJ0qjls4Sgn45WhQjuQ2ZY2jZNbsDdh52okcKPwH_sBbj00IHy8SpP_aWy2dLdS7OrqQgiBN8NiNvmwlOhbpmvrIOXrIfnTzu3jn1LvhCt1XrrabvoFYYwvKHcCi9mh7olWW9WgmdvSBiPPZuR65apyM_Gkc5JuOKCzNf6ivD0ZhLTqmmdiztdgqL1JSn54dzDFA"
              />
            </div>
          </article>

          {/* Step 2: Currently In Progress */}
          <article className="bg-surface-container-low rounded-lg p-space-md border-2 border-primary/40 terracotta-shadow space-y-space-sm relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-16 h-16 bg-primary/10 rounded-full pointer-events-none"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center text-label-sm font-label-sm">
                  02
                </span>
                <span className="text-headline-sm font-headline-sm text-on-surface">
                  Square Knots &amp; Spiral Twist
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-label-sm font-label-sm">
                Current Focus
              </span>
            </div>
            <p className="text-body-md font-body-md text-on-surface leading-relaxed">
              Divide the sixteen cords into four groups of four. In each cluster, isolate two outer working cords and two center filler cords. Create 8 consecutive half-square knots in the same direction; watch the rope organically begin to spiral in a graceful helix!
            </p>
            
            {/* Step illustration/photo */}
            <div className="h-48 rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container relative">
              <img
                className="w-full h-full object-cover"
                alt="Hands crafting an intricate macramé spiral knot pattern on creamy cotton cords"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmWXWtAtiaSOgFSeV365WACnFCriUhvpAeE8aCDBCH3gmDJJn0Y7G3nSfQyoyEV4nwUyMZwhb4C3zUIHxuVSgmqT8yxPsf_Rb4ffDxGJjfF8Q4Df90EBiD7bl3eGSSVhUxQsgiV-XUSOoz9aTp9z3CgIHqzhL2h6r9TxIJ5H0TLxFuZKHqh7TAzNUo8sK6F7boN75fo4wrNemVykrX_NEEaOz2oGMzLm8uKFa9Jiwt5k06ZEngOL6SYA"
              />
              <div className="absolute bottom-2 left-2 bg-surface/90 backdrop-blur-sm px-space-xs py-1 rounded-full text-label-sm font-label-sm text-on-surface flex items-center gap-1 border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary text-sm">lightbulb</span>
                Keep outer tension snug but gentle
              </div>
            </div>

            {/* Checkpoint Bar for Step 2 */}
            <div className="bg-surface-container-highest/80 rounded-2xl p-space-xs flex items-center justify-between border border-outline-variant/40">
              <div className="flex items-center gap-2 pl-space-xs">
                <span
                  className="material-symbols-outlined text-primary text-base"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  pin_drop
                </span>
                <span className="text-label-md font-label-md text-on-surface">Progress Saved at Knot #14</span>
              </div>
              <button
                className="px-space-md py-2 rounded-full bg-secondary hover:bg-secondary/90 text-on-secondary text-label-md font-label-md transition-all active:scale-95 flex items-center gap-1.5 ambient-shadow cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-sm">bookmark_add</span>
                Finish here
              </button>
            </div>
          </article>

          {/* Step 3: Basket Formation */}
          <article className="bg-surface-container-lowest rounded-lg p-space-md border border-outline-variant/30 ambient-shadow space-y-space-xs opacity-90">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center text-label-sm font-label-sm font-bold">
                  03
                </span>
                <span className="text-headline-sm font-headline-sm text-on-surface">Connecting the Basket Net</span>
              </div>
              <span className="text-label-sm font-label-sm text-on-surface-variant">Upcoming</span>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
              Measure 10cm down from your spiral sections. Take two strands from one arm and two adjacent strands from the next arm. Join them with alternating square knots to weave the supportive cradle for your planter.
            </p>
          </article>

          {/* Step 4: Final Tassel Trim */}
          <article className="bg-surface-container-lowest rounded-lg p-space-md border border-outline-variant/30 ambient-shadow space-y-space-xs opacity-90">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center text-label-sm font-label-sm font-bold">
                  04
                </span>
                <span className="text-headline-sm font-headline-sm text-on-surface">Closing Knot &amp; Tassel Brush</span>
              </div>
              <span className="text-label-sm font-label-sm text-on-surface-variant">Upcoming</span>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
              Gather all tail strands 8cm beneath the basket base and bind with a grand gathering knot. Trim neatly with shears and optionally brush the ends into a fluffy boho fringe!
            </p>
          </article>
        </section>

        {/* Course Completion Celebration & Photo Upload Module */}
        <section className="bg-surface-container-highest rounded-lg p-space-lg border-2 border-dashed border-outline-variant/80 ambient-shadow text-center space-y-space-md relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute -top-10 -left-10 w-28 h-28 bg-primary-fixed/40 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-secondary-fixed/50 rounded-full blur-2xl pointer-events-none"></div>

          {/* Star Badge Header */}
          <div className="flex flex-col items-center gap-1 relative z-10">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary terracotta-shadow mb-1 animate-bounce">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-lowest rounded-full border border-primary/30">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
              </span>
              <span className="text-label-md font-label-md text-primary">+2 Creative Stars</span>
            </div>
            <h2 className="text-headline-lg font-headline-lg text-on-surface mt-1">Finished your hanger?</h2>
            <p className="text-body-md font-body-md text-on-surface-variant max-w-[280px]">
              Share your creation to earn stars and celebrate your beautiful handmade piece with fellow crafters!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 space-y-space-xs">
            <button
              onClick={onComplete}
              className="w-full py-3.5 px-space-xl rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-headline-sm transition-all duration-150 active:scale-95 terracotta-shadow flex items-center justify-center gap-2 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                add_a_photo
              </span>
              <span>Finished &amp; Share Photo</span>
            </button>
            <button
              onClick={onComplete}
              className="w-full py-2.5 px-space-md rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-label-md font-label-md transition-colors active:scale-95 cursor-pointer"
              type="button"
            >
              Mark Completed without photo
            </button>
          </div>
          <p className="text-label-sm font-label-sm text-secondary relative z-10">
            ✨ Your project will be featured in the Community Gallery!
          </p>
        </section>

      </div>

      {/* 3. Bottom Persistent Checkpoint Floating Action Bar */}
      <aside className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto z-50 bg-surface/95 backdrop-blur-md px-space-md py-space-sm ambient-shadow flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-sm">bookmark</span>
          </div>
          <div className="flex flex-col">
            <span className="text-label-sm font-label-sm text-secondary">Current Anchor</span>
            <span className="text-label-md font-label-md text-on-surface">Step 2: Spiral Knot</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-space-md py-2.5 rounded-full bg-secondary text-on-secondary hover:bg-secondary/90 text-label-md font-label-md flex items-center gap-1.5 transition-transform active:scale-95 shadow-sm cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base">pin_drop</span>
            Finish here
          </button>
          <button
            aria-label="Advance step"
            className="w-10 h-10 rounded-full bg-primary text-on-primary hover:bg-primary-container flex items-center justify-center transition-transform active:scale-95 terracotta-shadow cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined font-bold">arrow_forward</span>
          </button>
        </div>
      </aside>

    </main>
  )
}
