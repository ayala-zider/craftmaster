import { useState } from 'react'

/**
 * Props for CraftMasterCreateCourse component.
 * Allows parent components to handle closing, publishing, and navigation.
 */
export interface CraftMasterCreateCourseProps {
  onClose?: () => void
  onPublish?: (courseData: Record<string, unknown>) => void
  onNavigate?: (tab: 'home' | 'courses' | 'my-courses') => void
}

/**
 * CraftMasterCreateCourse
 * 
 * Direct, faithful React conversion of `craft_master_create_course/code.html`.
 * Represents the comprehensive course creator studio view matching GEMINI.md:
 *  - Form with Title, Cover Image/Media Upload, Difficulty Level (Beginner, Intermediate, Master),
 *    Materials, Step-by-Step Instruction Builder, Tags/Category, Creator Profile Toggle, and Intro.
 *  - Background courses explorer canvas with bottom taskbar.
 */
export function CraftMasterCreateCourse({
  onClose,
  onPublish,
  onNavigate,
}: CraftMasterCreateCourseProps) {
  // Modal visibility state (open by default in this view)
  const [isOpen, setIsOpen] = useState<boolean>(true)

  // Form input states with defaults matching the design prototype
  const [title, setTitle] = useState<string>('Hand-carved Botanical Stamps')
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'master'>('beginner')
  const [materialsText, setMaterialsText] = useState<string>(
    '1. Soft linoleum or rubber carving block\n2. V-gouge and U-gouge linocut carving tools\n3. Tracing paper & botanical sketch templates\n4. Archival craft ink pads and cotton stationery cards'
  )
  const [steps, setSteps] = useState([
    {
      id: 1,
      title: 'Transferring Botanical Motif to Linoleum',
      description:
        'Draw or trace your botanical sprig on greaseproof paper. Flip and burnish with a bone folder to transfer graphite cleanly onto rubber.',
      attachment: 'step1_transfer.png attached',
    },
    {
      id: 2,
      title: 'Carving Contours with V-Gouge',
      description:
        'Angle the tiny V-tool at 30 degrees. Rotate the rubber block, keeping your non-dominant guiding hand safely behind the blade path.',
      attachment: 'step2_carving.png attached',
    },
  ])
  const [tags, setTags] = useState<string[]>(['Ceramics', 'Printmaking', 'Botanicals'])
  const [showCreatorBadge, setShowCreatorBadge] = useState<boolean>(true)
  const [introText, setIntroText] = useState<string>(
    'Immerse yourself in carving organic leaf, blossom, and sprig patterns. Perfect for personalizing gift tags, fabrics, and handmade cards.'
  )
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'my-courses'>('courses')

  // Close helper
  const handleClose = () => {
    setIsOpen(false)
    if (onClose) {
      onClose()
    }
  }

  // Add step helper
  const addStep = () => {
    const nextId = steps.length + 1
    setSteps([
      ...steps,
      {
        id: nextId,
        title: `Step ${nextId}`,
        description: 'Describe this step in detail...',
        attachment: '',
      },
    ])
  }

  // Remove step helper
  const removeStep = (id: number) => {
    setSteps(steps.filter((s) => s.id !== id))
  }

  // Remove tag helper
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onPublish) {
      onPublish({
        title,
        difficulty,
        materialsText,
        steps,
        tags,
        showCreatorBadge,
        introText,
      })
    }
    handleClose()
  }

  return (
    // Outer Mobile Shell (max-w-[430px])
    <div className="w-full max-w-[430px] min-h-screen bg-background relative flex flex-col shadow-[0_12px_40px_rgba(110,80,60,0.12)] border-x border-outline-variant/30 sm:rounded-3xl overflow-hidden">
      
      {/* Background Top App Bar */}
      <header className="sticky top-0 z-40 bg-surface shadow-sm transition-transform">
        <div className="flex justify-between items-center w-full px-space-md py-space-sm max-w-[430px] mx-auto">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[28px]" data-icon="palette">
              palette
            </span>
            <span className="text-headline-sm font-headline-sm font-bold text-primary tracking-tight">
              Craft Master
            </span>
          </div>
          <div className="flex items-center gap-space-xs">
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
            <button
              type="button"
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container transition-all text-on-surface-variant cursor-pointer"
            >
              <span className="material-symbols-outlined" data-icon="notifications">
                notifications
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Background Main Content */}
      <main className="flex-1 px-space-md pt-space-md pb-28 flex flex-col gap-space-lg">
        <div className="flex items-center gap-space-xs">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px]" data-icon="search">
                search
              </span>
            </div>
            <input
              type="text"
              readOnly
              placeholder="Search crafts, stitches, clay..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface text-on-surface text-body-md font-body-md rounded-full border border-outline-variant"
            />
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]" data-icon="add">
              add
            </span>
          </button>
        </div>
      </main>

      {/* Course Creator Modal View */}
      {isOpen && (
        <div
          id="createCourseModal"
          className="fixed inset-0 z-50 flex items-end justify-center p-0 bg-on-surface/40 backdrop-blur-xs transition-opacity"
        >
          <div className="w-full max-w-[430px] bg-surface rounded-t-xl border-t border-x border-outline-variant shadow-2xl p-space-lg flex flex-col gap-space-md max-h-[85vh] overflow-y-auto no-scrollbar relative animate-in fade-in slide-in-from-bottom-8 duration-200">
            {/* Drag Handle Indicator */}
            <div className="w-12 h-1.5 bg-outline-variant/60 rounded-full mx-auto -mt-1 mb-1"></div>

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/40">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]" data-icon="edit_note">
                    edit_note
                  </span>
                </div>
                <div>
                  <h3 className="text-headline-sm font-headline-sm font-bold text-on-surface leading-tight">
                    Create New Course
                  </h3>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">
                    Share your craft wisdom with the community
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]" data-icon="close">
                  close
                </span>
              </button>
            </div>

            {/* Mandatory Notice */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-DEFAULT bg-surface-container/60 border border-outline-variant/30 text-[12px] text-on-surface-variant font-body-sm">
              <span className="material-symbols-outlined text-[14px] text-primary" data-icon="info">
                info
              </span>
              <span>
                All fields marked with <span className="text-primary font-bold">*</span> are required
              </span>
            </div>

            {/* Course Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
              {/* Field 1: Course Title (Mandatory) */}
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-label-md text-on-surface flex items-center justify-between">
                  <span>
                    Course Title <span className="text-primary">*</span>
                  </span>
                  <span className="text-label-sm font-label-sm text-primary font-bold">Mandatory</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Hand-carved Botanical Stamps"
                  className="w-full px-3.5 py-2.5 rounded-DEFAULT bg-surface-container-lowest border border-outline-variant text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm"
                />
              </div>

              {/* Field 2: Course Cover & Media Upload */}
              <div className="flex flex-col gap-1.5">
                <label className="text-label-md font-label-md text-on-surface flex items-center justify-between">
                  <span>
                    Course Cover &amp; Media Upload <span className="text-primary">*</span>
                  </span>
                  <span className="text-label-sm font-label-sm text-primary font-bold">Mandatory</span>
                </label>
                <div className="border-2 border-dashed border-primary/30 rounded-DEFAULT bg-surface-container/60 p-3 flex flex-col items-center justify-center gap-2 text-center hover:border-primary transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[24px]" data-icon="add_photo_alternate">
                      add_photo_alternate
                    </span>
                  </div>
                  <div>
                    <p className="text-label-md font-label-md text-on-surface font-bold">
                      Upload Cover Image or Video Tutorial
                    </p>
                    <p className="text-[11px] text-on-surface-variant">
                      PNG, JPG, MP4 or MOV (up to 250MB, recommended 1:1 or 16:9 ratio)
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="px-2.5 py-1 bg-surface rounded-full text-label-sm font-label-sm text-primary border border-primary/30 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]" data-icon="upload">
                        upload
                      </span>{' '}
                      Choose File
                    </span>
                    <span className="text-label-sm font-label-sm text-on-surface-variant/60">
                      botanical_preview.jpg (2.4MB) ✓
                    </span>
                  </div>
                </div>
              </div>

              {/* Field 3: Difficulty Level */}
              <div className="flex flex-col gap-1.5">
                <label className="text-label-md font-label-md text-on-surface flex items-center justify-between">
                  <span>
                    Difficulty Level <span className="text-primary">*</span>
                  </span>
                  <span className="text-label-sm font-label-sm text-on-surface-variant/60">
                    Select difficulty tier
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <label
                    onClick={() => setDifficulty('beginner')}
                    className={`cursor-pointer rounded-DEFAULT p-2 flex flex-col items-center gap-1 transition-all ${
                      difficulty === 'beginner'
                        ? 'border-2 border-primary bg-primary/10 shadow-sm'
                        : 'border border-outline-variant bg-surface-container-lowest hover:border-primary'
                    }`}
                  >
                    <span
                      className={`text-label-sm font-label-sm font-bold ${
                        difficulty === 'beginner' ? 'text-primary' : 'text-on-surface'
                      }`}
                    >
                      Beginner
                    </span>
                    <span className="text-[11px] font-bold text-primary flex items-center gap-0.5">
                      <span
                        className="material-symbols-outlined text-[12px]"
                        data-icon="star"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>{' '}
                      2
                    </span>
                  </label>

                  <label
                    onClick={() => setDifficulty('intermediate')}
                    className={`cursor-pointer rounded-DEFAULT p-2 flex flex-col items-center gap-1 transition-all ${
                      difficulty === 'intermediate'
                        ? 'border-2 border-primary bg-primary/10 shadow-sm'
                        : 'border border-outline-variant bg-surface-container-lowest hover:border-primary'
                    }`}
                  >
                    <span
                      className={`text-label-sm font-label-sm font-bold ${
                        difficulty === 'intermediate' ? 'text-primary' : 'text-on-surface'
                      }`}
                    >
                      Intermediate
                    </span>
                    <span className="text-[11px] font-bold text-tertiary flex items-center gap-0.5">
                      <span
                        className="material-symbols-outlined text-[12px]"
                        data-icon="star"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>{' '}
                      5
                    </span>
                  </label>

                  <label
                    onClick={() => setDifficulty('master')}
                    className={`cursor-pointer rounded-DEFAULT p-2 flex flex-col items-center gap-1 transition-all ${
                      difficulty === 'master'
                        ? 'border-2 border-primary bg-primary/10 shadow-sm'
                        : 'border border-outline-variant bg-surface-container-lowest hover:border-primary'
                    }`}
                  >
                    <span
                      className={`text-label-sm font-label-sm font-bold ${
                        difficulty === 'master' ? 'text-primary' : 'text-on-surface'
                      }`}
                    >
                      Master
                    </span>
                    <span className="text-[11px] font-bold text-tertiary flex items-center gap-0.5">
                      <span
                        className="material-symbols-outlined text-[12px]"
                        data-icon="star"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>{' '}
                      8
                    </span>
                  </label>
                </div>
              </div>

              {/* Field 4: Required Materials & Tools */}
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-label-md text-on-surface flex items-center justify-between">
                  <span>
                    Required Materials &amp; Tools <span className="text-primary">*</span>
                  </span>
                  <span className="text-label-sm font-label-sm text-primary font-bold">Mandatory</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={materialsText}
                  onChange={(e) => setMaterialsText(e.target.value)}
                  placeholder="List required materials..."
                  className="w-full px-3.5 py-2 rounded-DEFAULT bg-surface-container-lowest border border-outline-variant text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm"
                />
              </div>

              {/* Field 5: Step-by-Step Instruction Builder */}
              <div className="p-3 bg-surface-container/60 rounded-DEFAULT border border-outline-variant/60 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-label-md font-label-md text-on-surface font-bold flex items-center gap-1">
                      Course Instructions &amp; Steps <span className="text-primary">*</span>
                    </span>
                    <span className="text-body-sm font-body-sm text-on-surface-variant">
                      Build structured step-by-step lessons
                    </span>
                  </div>
                  <span className="text-label-sm font-label-sm text-primary font-bold">
                    {steps.length} Steps Added
                  </span>
                </div>

                {/* Steps List */}
                {steps.map((step, idx) => (
                  <div
                    key={step.id}
                    className="p-2.5 bg-surface-container-lowest rounded-DEFAULT border border-outline-variant flex flex-col gap-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-sm font-label-sm font-bold">
                        Step {idx + 1}
                      </span>
                      <div className="flex items-center gap-1 text-on-surface-variant">
                        <button
                          type="button"
                          onClick={() => removeStep(step.id)}
                          className="hover:text-error p-0.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]" data-icon="delete">
                            delete
                          </span>
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        const updated = [...steps]
                        updated[idx].title = e.target.value
                        setSteps(updated)
                      }}
                      placeholder="Step Title"
                      className="w-full px-2.5 py-1.5 rounded-DEFAULT bg-surface border border-outline-variant/60 text-body-sm font-body-sm text-on-surface focus:outline-none focus:border-primary"
                    />
                    <textarea
                      rows={2}
                      value={step.description}
                      onChange={(e) => {
                        const updated = [...steps]
                        updated[idx].description = e.target.value
                        setSteps(updated)
                      }}
                      placeholder="Detailed instructions for this step..."
                      className="w-full px-2.5 py-1.5 rounded-DEFAULT bg-surface border border-outline-variant/60 text-body-sm font-body-sm text-on-surface focus:outline-none focus:border-primary"
                    />
                    {step.attachment && (
                      <div className="flex items-center gap-2 pt-1 border-t border-outline-variant/30 text-label-sm font-label-sm text-tertiary">
                        <span className="material-symbols-outlined text-[15px]" data-icon="image">
                          image
                        </span>
                        <span>{step.attachment}</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add Another Step Button */}
                <button
                  type="button"
                  onClick={addStep}
                  className="w-full py-2 bg-surface border border-dashed border-primary text-primary rounded-DEFAULT text-label-sm font-label-sm font-bold flex items-center justify-center gap-1 hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]" data-icon="add_circle">
                    add_circle
                  </span>
                  + Add Another Step
                </button>
              </div>

              {/* Field 6: Tags / Category */}
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-label-md text-on-surface flex items-center justify-between">
                  <span>
                    Tags / Category <span className="text-primary">*</span>
                  </span>
                  <span className="text-label-sm font-label-sm text-primary font-bold">Mandatory</span>
                </label>
                <div className="flex flex-wrap gap-1.5 p-2 bg-surface-container-lowest border border-outline-variant rounded-DEFAULT items-center">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-surface-container text-on-surface rounded-full text-label-sm font-label-sm flex items-center gap-1 border border-outline-variant/60"
                    >
                      {tag}
                      <span
                        onClick={() => removeTag(tag)}
                        className="material-symbols-outlined text-[13px] text-on-surface-variant hover:text-error cursor-pointer"
                        data-icon="close"
                      >
                        close
                      </span>
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newTag = prompt('Enter new tag/category:')
                      if (newTag && !tags.includes(newTag)) {
                        setTags([...tags, newTag])
                      }
                    }}
                    className="px-2.5 py-1 bg-surface-container-lowest text-primary rounded-full text-label-sm font-label-sm border border-dashed border-primary flex items-center gap-1 hover:bg-primary/10 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]" data-icon="add">
                      add
                    </span>{' '}
                    Add Tag
                  </button>
                </div>
              </div>

              {/* Field 7: Course Creator Toggle */}
              <div className="p-3 bg-surface-container rounded-DEFAULT border border-outline-variant flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-label-md font-label-md text-on-surface font-bold">
                      Show as Creator
                    </span>
                    <span className="text-label-sm font-label-sm text-on-surface-variant">
                      Toggle off to publish anonymously
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showCreatorBadge}
                      onChange={(e) => setShowCreatorBadge(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                {showCreatorBadge && (
                  <div className="flex items-center justify-between pt-2 border-t border-outline-variant/40">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-[12px]">
                        NC
                      </div>
                      <div className="flex flex-col">
                        <span className="text-label-sm font-label-sm text-on-surface font-bold leading-none">
                          Noa Crafty
                        </span>
                        <span className="text-[11px] text-tertiary font-medium">Master Host Profile</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">
                      Verified Crafter
                    </span>
                  </div>
                )}
              </div>

              {/* Field 8: Course Intro (Optional) */}
              <div className="flex flex-col gap-1">
                <label className="text-label-md font-label-md text-on-surface flex items-center justify-between">
                  <span>Course Intro (Optional)</span>
                  <span className="text-label-sm font-label-sm text-on-surface-variant/60">Optional blurb</span>
                </label>
                <textarea
                  rows={2}
                  value={introText}
                  onChange={(e) => setIntroText(e.target.value)}
                  placeholder="A short welcoming blurb..."
                  className="w-full px-3.5 py-2 rounded-DEFAULT bg-surface-container-lowest border border-outline-variant text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 pb-4 flex gap-2.5">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 rounded-full border border-outline-variant bg-surface text-on-surface font-label-md text-label-md font-bold hover:bg-surface-container transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]" data-icon="draft">
                    draft
                  </span>
                  <span>Save as Draft</span>
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-[0_6px_18px_rgba(190,129,110,0.28)] hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Publish Workshop</span>
                  <span className="material-symbols-outlined text-[18px]" data-icon="rocket_launch">
                    rocket_launch
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Taskbar */}
      <nav className="fixed bottom-0 left-0 right-0 w-full z-50 flex justify-around items-center px-space-md py-space-xs max-w-[430px] mx-auto bg-surface shadow-lg">
        <button
          type="button"
          onClick={() => {
            setActiveTab('home')
            if (onNavigate) onNavigate('home')
          }}
          className={`flex flex-col items-center justify-center px-space-md py-space-xs transition-all duration-200 cursor-pointer ${
            activeTab === 'home' ? 'bg-primary text-on-primary rounded-full' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]" data-icon="home">
            home
          </span>
          <span className="text-label-sm font-label-sm mt-0.5">Home</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('courses')
            if (onNavigate) onNavigate('courses')
          }}
          className={`flex flex-col items-center justify-center px-space-md py-space-xs transition-all duration-200 cursor-pointer ${
            activeTab === 'courses' ? 'bg-primary text-on-primary rounded-full' : 'text-on-surface-variant'
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

        <button
          type="button"
          onClick={() => {
            setActiveTab('my-courses')
            if (onNavigate) onNavigate('my-courses')
          }}
          className={`flex flex-col items-center justify-center px-space-md py-space-xs transition-all duration-200 cursor-pointer ${
            activeTab === 'my-courses' ? 'bg-primary text-on-primary rounded-full' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]" data-icon="auto_stories">
            auto_stories
          </span>
          <span className="text-label-sm font-label-sm mt-0.5">My Courses</span>
        </button>
      </nav>

    </div>
  )
}

