import { useState } from 'react'

/**
 * Props for CraftMasterMyCourses component.
 * Allows parent components to receive navigation and course continuation callbacks.
 */
export interface CraftMasterMyCoursesProps {
  onNavigate?: (tab: 'home' | 'courses' | 'my-courses') => void
  onContinueCourse?: (courseId: string) => void
}

/**
 * CraftMasterMyCourses
 * 
 * Direct, faithful React conversion of `craft_master_my_courses/code.html`.
 * Features:
 *  1. Top app bar with palette logo, "Craft Master" title, and stars action button
 *  2. Header showing "My Courses" with an active pulse indicator and active courses count
 *  3. Daily Craft Streak card with flame icon and accumulated points badge (350 pts)
 *  4. List of in-progress course cards:
 *     - Left 50% course image with module badge ("Module X of Y")
 *     - Right 50% category tag, course title, percentage progress bar, time left, and "Continue" button
 *  5. Creative Checkpoint educational tip card
 *  6. Bottom navigation bar with "My Courses" highlighted as the active tab
 */
export function CraftMasterMyCourses({
  onNavigate,
  onContinueCourse,
}: CraftMasterMyCoursesProps) {
  // Active bottom navigation tab (defaults to 'my-courses' on this screen)
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'my-courses'>('my-courses')

  // Handle bottom navigation tab switch
  const handleTabClick = (tab: 'home' | 'courses' | 'my-courses') => {
    setActiveTab(tab)
    if (onNavigate) {
      onNavigate(tab)
    }
  }

  // Handle continue course click
  const handleContinue = (courseId: string) => {
    if (onContinueCourse) {
      onContinueCourse(courseId)
    }
  }

  return (
    // Outer Mobile Shell (max-w-[430px])
    <div className="w-full max-w-[430px] bg-background min-h-screen flex flex-col relative shadow-[0_12px_36px_-6px_rgba(110,80,60,0.18)] sm:rounded-3xl overflow-hidden">
      
      {/* 1. Top App Bar */}
      <header className="bg-surface sticky top-0 z-40 shadow-sm">
        <div className="flex justify-between items-center w-full px-space-md py-space-xs max-w-[430px] mx-auto">
          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              aria-label="Palette brand icon"
              className="p-space-xs rounded-full hover:bg-surface-container text-primary transition-transform active:scale-95 flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined" data-icon="palette">
                palette
              </span>
            </button>
            <span className="text-headline-sm font-headline-sm font-bold text-primary">
              Craft Master
            </span>
          </div>

          <button
            type="button"
            aria-label="Stars activity"
            className="p-space-xs rounded-full hover:bg-surface-container text-primary transition-transform active:scale-95 flex items-center justify-center cursor-pointer"
          >
            <span
              className="material-symbols-outlined"
              data-icon="stars"
              data-weight="fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
          </button>
        </div>
      </header>

      {/* 2. Main Content Flow */}
      <main className="flex-1 px-space-md pt-space-md pb-space-4xl flex flex-col gap-space-lg">
        
        {/* Header Title & Active Status */}
        <section className="flex flex-col gap-space-2xs">
          <h1 className="text-headline-lg font-headline-lg text-on-surface">
            My Courses
          </h1>
          <div className="flex items-center gap-space-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <p className="text-body-md font-body-md text-on-surface-variant">
              3 courses in progress
            </p>
          </div>
        </section>

        {/* Daily Craft Streak Card */}
        <section className="bg-surface-container-low border border-outline-variant/50 rounded-lg p-space-md shadow-[0_4px_14px_-2px_rgba(110,80,60,0.08)] flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
              <span
                className="material-symbols-outlined"
                data-icon="local_fire_department"
                data-weight="fill"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
            </div>
            <div>
              <p className="text-label-md font-label-md text-secondary">Daily Craft Streak</p>
              <p className="text-body-sm font-body-sm text-on-surface-variant">5 days active crafting</p>
            </div>
          </div>
          <div className="flex items-center gap-space-2xs bg-surface-container px-space-sm py-space-2xs rounded-full border border-outline-variant/30">
            <span
              className="material-symbols-outlined text-primary text-body-lg"
              data-icon="star"
              data-weight="fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="text-label-md font-label-md text-primary font-bold">350 pts</span>
          </div>
        </section>

        {/* Courses Cards List */}
        <section className="flex flex-col gap-space-md">
          
          {/* Course 1: Hand-Built Textured Ceramics (65%) */}
          <article className="bg-surface-container-lowest border border-outline-variant/40 rounded-lg overflow-hidden shadow-[0_4px_14px_-2px_rgba(110,80,60,0.08)] transition-all hover:shadow-[0_8px_24px_-4px_rgba(190,129,110,0.22)]">
            <div className="grid grid-cols-2 h-56 sm:h-60">
              {/* Left Image Square */}
              <div className="relative h-full w-full overflow-hidden p-space-xs">
                <img
                  className="w-full h-full object-cover rounded-DEFAULT"
                  alt="Hands shaping an organic terracotta ceramic bowl on an artisan wheel"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAizJHbDQWLhzw8P_amoacMPJVjVHun_m2CyuHxQiUvZY46dlIHK_UZ5Mdf7lJJxTkf9EdNSq9V8unVSWrnI_4UXQBmL1rdLWvJi50NnEH_1ArpeX62ZRw5N6O2Z-IMDzKmPIFG4WsF-RRVO4oKfYpK8EzlzPXQ5o7BCv6v6rpHhJwh7lgNmZl9NX1XDDqLI1CiAoeppVt-vZdzzoHG3_scridG_jSu_yBnb0kLzDo-_Fbva3TLSKNGfg"
                />
                <span className="absolute top-3 left-3 bg-secondary-container/90 backdrop-blur-sm text-secondary px-space-xs py-0.5 rounded-full text-label-sm font-label-sm shadow-sm">
                  Module 4 of 6
                </span>
              </div>

              {/* Right Content */}
              <div className="p-space-sm flex flex-col justify-between h-full bg-surface-container-low/50">
                <div className="flex flex-col gap-space-xs">
                  <div>
                    <span className="text-label-sm font-label-sm text-secondary uppercase tracking-wider">
                      Pottery &amp; Clay
                    </span>
                    <h2 className="text-headline-sm font-headline-sm text-on-surface line-clamp-2 leading-snug">
                      Hand-Built Textured Ceramics
                    </h2>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-label-sm font-label-sm">
                      <span className="text-on-surface-variant font-label-sm">65% Completed</span>
                      <span className="text-primary font-bold font-label-sm">65%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-space-2xs text-on-surface-variant text-body-sm font-body-sm">
                    <span className="material-symbols-outlined text-base" data-icon="schedule">
                      schedule
                    </span>
                    <span>18m left in session</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleContinue('ceramics')}
                  className="w-full mt-space-xs bg-primary text-on-primary py-space-xs px-space-sm rounded-full font-label-md text-label-md flex items-center justify-center gap-space-2xs shadow-[0_4px_12px_rgba(131,78,62,0.25)] hover:bg-primary-container active:scale-95 transition-all cursor-pointer"
                >
                  <span>Continue</span>
                  <span className="material-symbols-outlined text-sm font-bold" data-icon="arrow_forward">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </article>

          {/* Course 2: Chunky Knitwear & Cozy Loops (40%) */}
          <article className="bg-surface-container-lowest border border-outline-variant/40 rounded-lg overflow-hidden shadow-[0_4px_14px_-2px_rgba(110,80,60,0.08)] transition-all hover:shadow-[0_8px_24px_-4px_rgba(190,129,110,0.22)]">
            <div className="grid grid-cols-2 h-56 sm:h-60">
              {/* Left Image Square */}
              <div className="relative h-full w-full overflow-hidden p-space-xs">
                <img
                  className="w-full h-full object-cover rounded-DEFAULT"
                  alt="Chunky pastel merino wool yarn, wooden knitting needles, and knit sweater"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDArmL7OSrInpZOFfmbcPdQPKZmSXe8-cCVIm6KGv29tsbWlYUd1aYKrMwvW4Z8zVOoukd52e--vgXXmGGqjIJqPttZwLvR42E56Qu_DqpZshh2Etg0zlk4_5rJQ5E2_iNRVhLYPn2J9-F674Xrje8gUD6xkvo7pvz3IKG6OC8SJehgfAw23OX57dy0gwfiyC0Go2KUwfKfJRlRuinfa6iRVZTEiM9AMy9JQDiASSBOlUtNbyhb9QZN7w"
                />
                <span className="absolute top-3 left-3 bg-secondary-container/90 backdrop-blur-sm text-secondary px-space-xs py-0.5 rounded-full text-label-sm font-label-sm shadow-sm">
                  Module 2 of 5
                </span>
              </div>

              {/* Right Content */}
              <div className="p-space-sm flex flex-col justify-between h-full bg-surface-container-low/50">
                <div className="flex flex-col gap-space-xs">
                  <div>
                    <span className="text-label-sm font-label-sm text-secondary uppercase tracking-wider">
                      Fiber Arts
                    </span>
                    <h2 className="text-headline-sm font-headline-sm text-on-surface line-clamp-2 leading-snug">
                      Chunky Knitwear &amp; Cozy Loops
                    </h2>
                  </div>

                  {/* Progress bar */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-label-sm font-label-sm">
                      <span className="text-on-surface-variant font-label-sm">40% Completed</span>
                      <span className="text-primary font-bold font-label-sm">40%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '40%' }}></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-space-2xs text-on-surface-variant text-body-sm font-body-sm">
                    <span className="material-symbols-outlined text-base" data-icon="schedule">
                      schedule
                    </span>
                    <span>35m left in session</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleContinue('knitwear')}
                  className="w-full mt-space-xs bg-primary text-on-primary py-space-xs px-space-sm rounded-full font-label-md text-label-md flex items-center justify-center gap-space-2xs shadow-[0_4px_12px_rgba(131,78,62,0.25)] hover:bg-primary-container active:scale-95 transition-all cursor-pointer"
                >
                  <span>Continue</span>
                  <span className="material-symbols-outlined text-sm font-bold" data-icon="arrow_forward">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </article>

          {/* Course 3: Botanical Flora & Leaf Blends (85%) */}
          <article className="bg-surface-container-lowest border border-outline-variant/40 rounded-lg overflow-hidden shadow-[0_4px_14px_-2px_rgba(110,80,60,0.08)] transition-all hover:shadow-[0_8px_24px_-4px_rgba(190,129,110,0.22)]">
            <div className="grid grid-cols-2 h-56 sm:h-60">
              {/* Left Image Square */}
              <div className="relative h-full w-full overflow-hidden p-space-xs">
                <img
                  className="w-full h-full object-cover rounded-DEFAULT"
                  alt="Botanical watercolor illustration setup with textured paper, green leaves, and sable brushes"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEsgD2-dqQXlH5dZqU-I2VWo7OtfnevsYE2jHvsJZZDM4YXRZ-rJis-6ia5eWpD9jxyl6wVsp2Jk0c-E-KsyyjMVSdeFvxAwDOI4h4Cg1YMC577UMgcZVoz4uSkmgpafh_nS7CvneDBHTWXIHSWrEcwQfvXzMSNhVPCuZ_exqF7FGkYB37bZa9EvS6mjYCl6tH_-YZm8GkNOP2e2cXm5IAxpzfFw9SyXN0u1qvXXNEbBG4h9AYrqcvTQ"
                />
                <span className="absolute top-3 left-3 bg-secondary-container/90 backdrop-blur-sm text-secondary px-space-xs py-0.5 rounded-full text-label-sm font-label-sm shadow-sm">
                  Module 5 of 6
                </span>
              </div>

              {/* Right Content */}
              <div className="p-space-sm flex flex-col justify-between h-full bg-surface-container-low/50">
                <div className="flex flex-col gap-space-xs">
                  <div>
                    <span className="text-label-sm font-label-sm text-secondary uppercase tracking-wider">
                      Watercolor
                    </span>
                    <h2 className="text-headline-sm font-headline-sm text-on-surface line-clamp-2 leading-snug">
                      Botanical Flora &amp; Leaf Blends
                    </h2>
                  </div>

                  {/* Progress bar */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-label-sm font-label-sm">
                      <span className="text-on-surface-variant font-label-sm">85% Completed</span>
                      <span className="text-primary font-bold font-label-sm">85%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-space-2xs text-on-surface-variant text-body-sm font-body-sm">
                    <span className="material-symbols-outlined text-base" data-icon="schedule">
                      schedule
                    </span>
                    <span>10m left in session</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleContinue('watercolor')}
                  className="w-full mt-space-xs bg-primary text-on-primary py-space-xs px-space-sm rounded-full font-label-md text-label-md flex items-center justify-center gap-space-2xs shadow-[0_4px_12px_rgba(131,78,62,0.25)] hover:bg-primary-container active:scale-95 transition-all cursor-pointer"
                >
                  <span>Continue</span>
                  <span className="material-symbols-outlined text-sm font-bold" data-icon="arrow_forward">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </article>

        </section>

        {/* Creative Checkpoint Section */}
        <section className="bg-surface-container p-space-md rounded-lg flex flex-col items-center text-center gap-space-xs border border-outline-variant/30">
          <span className="material-symbols-outlined text-secondary text-headline-md" data-icon="tips_and_updates">
            tips_and_updates
          </span>
          <h3 className="text-headline-sm font-headline-sm text-on-surface">Creative Checkpoint</h3>
          <p className="text-body-sm font-body-sm text-on-surface-variant max-w-xs">
            Each session automatically bookmarks your exact spot so you can jump back whenever inspiration strikes!
          </p>
        </section>

      </main>

      {/* 3. Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 w-full z-50 flex justify-around items-center px-space-md py-space-xs max-w-[430px] mx-auto bg-surface shadow-lg">
        {/* Home */}
        <button
          type="button"
          onClick={() => handleTabClick('home')}
          className={`flex flex-col items-center justify-center px-space-md py-space-xs transition-colors duration-150 active:scale-95 cursor-pointer ${
            activeTab === 'home'
              ? 'bg-primary text-on-primary rounded-full'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined" data-icon="home">
            home
          </span>
          <span className="text-label-sm font-label-sm">Home</span>
        </button>

        {/* Courses */}
        <button
          type="button"
          onClick={() => handleTabClick('courses')}
          className={`flex flex-col items-center justify-center px-space-md py-space-xs transition-colors duration-150 active:scale-95 cursor-pointer ${
            activeTab === 'courses'
              ? 'bg-primary text-on-primary rounded-full'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined" data-icon="grid_view">
            grid_view
          </span>
          <span className="text-label-sm font-label-sm">Courses</span>
        </button>

        {/* My Courses (ACTIVE on this screen) */}
        <button
          type="button"
          onClick={() => handleTabClick('my-courses')}
          className={`flex flex-col items-center justify-center px-space-md py-space-xs transition-all duration-200 active:scale-95 cursor-pointer ${
            activeTab === 'my-courses'
              ? 'bg-primary text-on-primary rounded-full shadow-[0_4px_12px_rgba(131,78,62,0.3)]'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span
            className="material-symbols-outlined"
            data-icon="auto_stories"
            data-weight="fill"
            style={{ fontVariationSettings: activeTab === 'my-courses' ? "'FILL' 1" : "'FILL' 0" }}
          >
            auto_stories
          </span>
          <span className="text-label-sm font-label-sm">My Courses</span>
        </button>
      </nav>

    </div>
  )
}
