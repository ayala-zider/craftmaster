import { useState } from 'react'

/**
 * Props for CraftMasterHomeScreen component.
 * We provide sensible defaults matching the original Stitch HTML prototype,
 * while allowing parent components (like App.tsx) to pass real dynamic data if desired.
 */
export interface CraftMasterHomeScreenProps {
  userName?: string
  userStars?: number
  streakDays?: number
  quote?: string
  onNavigate?: (tab: 'home' | 'courses' | 'my-courses') => void
  onSignOut?: () => void
}

/**
 * CraftMasterHomeScreen
 * 
 * Direct, faithful React conversion of `craft_master_home_screen/code.html`.
 * Features:
 *  1. Top App Bar with palette brand icon and stars status button
 *  2. Personalized Greeting & Studio Quote
 *  3. Cute Rewards Bar & Star Track (with progress bar)
 *  4. Horizontal Carousel for Recently Started Courses
 *  5. Category Filter Pills (All Studio, Pottery & Clay, Yarn & Weaving, Botanicals)
 *  6. Bento Grid for Trending Crafts (Pottery, Weaving, and Editor's Pick candle dipping)
 *  7. Bottom Navigation Bar with active tab indicator matching GEMINI.md requirements
 */
export function CraftMasterHomeScreen({
  userName = 'Noa Crafty',
  userStars = 15,
  streakDays = 14,
  quote = 'Every great craft begins with a single step. Keep creating!',
  onNavigate,
  onSignOut,
}: CraftMasterHomeScreenProps) {
  // State for the currently selected craft category pill
  const [selectedCategory, setSelectedCategory] = useState<string>('All Studio')

  // State for the bottom navigation bar active tab ('home', 'courses', or 'my-courses')
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'my-courses'>('home')

  // State for toggling favorite hearts on trending cards
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({
    'card-1': true,
    'card-2': false,
  })

  // Toggle favorite helper
  const toggleFavorite = (cardId: string) => {
    setFavorites((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }))
  }

  // Handle bottom navigation tab click
  const handleTabClick = (tab: 'home' | 'courses' | 'my-courses') => {
    setActiveTab(tab)
    if (onNavigate) {
      onNavigate(tab)
    }
  }

  // Categories list matching original HTML
  const categories = [
    'All Studio',
    'Pottery & Clay',
    'Yarn & Weaving',
    'Botanicals',
  ]

  return (
    // Outer Mobile Viewport Shell (matches exact max-w-[430px] from Stitch prototype)
    <div className="w-full max-w-[430px] min-h-screen sm:min-h-[920px] bg-background text-on-surface flex flex-col relative overflow-hidden sm:rounded-3xl soft-tactile-shadow">
      
      {/* 1. Top App Bar */}
      <header className="sticky top-0 z-40 bg-surface dark:bg-inverse-surface shadow-sm dark:shadow-none">
        <div className="flex justify-between items-center w-full px-space-md max-w-[430px] mx-auto py-space-sm">
          {/* Logo & Brand title */}
          <div className="flex items-center gap-space-xs">
            <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined" data-icon="palette">
                palette
              </span>
            </div>
            <span className="text-headline-sm font-headline-sm font-bold text-primary dark:text-inverse-primary tracking-tight">
              Craft Master
            </span>
          </div>

          {/* Sign Out Action Button (replaces the star icon in header) */}
          <button
            aria-label="Sign out"
            onClick={onSignOut}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors active:scale-95 duration-150 cursor-pointer"
            title="Sign out"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]" data-icon="logout">
              logout
            </span>
          </button>
        </div>
      </header>

      {/* 2. Main Scrollable Canvas */}
      <main className="flex-1 overflow-y-auto px-space-md pt-space-sm pb-space-4xl flex flex-col gap-space-xl no-scrollbar">
        
        {/* Personalized Greeting & Studio Quote */}
        <section className="flex flex-col gap-space-2xs pt-space-xs">
          <div className="flex items-center justify-between">
            <span className="text-label-md font-label-md text-secondary tracking-wider">
              STUDIO JOURNAL
            </span>
            <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-label-sm">
              Day {streakDays} Streak
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-primary tracking-tight">
            Welcome back, {userName}!
          </h1>
          <p className="text-body-md font-body-md text-on-surface-variant flex items-start gap-1.5 mt-0.5">
            <span
              className="material-symbols-outlined text-primary text-base select-none mt-0.5"
              data-icon="format_quote"
            >
              format_quote
            </span>
            <span>{quote}</span>
          </p>
        </section>

        {/* Cute Rewards Bar & Star Track */}
        <section className="w-full bg-surface-container rounded-2xl p-space-md border border-outline-variant/40 pill-float-shadow">
          <div className="flex items-center justify-between mb-space-xs">
            <div className="flex items-center gap-space-xs">
              <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary shadow-sm">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="star"
                  data-weight="fill"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              </div>
              <div>
                <div className="text-headline-sm font-headline-sm text-primary leading-tight">
                  {userStars} Stars Earned
                </div>
                <div className="text-label-sm font-label-sm text-on-surface-variant">
                  Level 3: Clay Sculptor
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-label-lg font-label-lg text-primary">
                5 to next star
              </span>
            </div>
          </div>

          {/* Custom Star Progress Track */}
          <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden p-0.5 mt-2 flex items-center">
            <div className="bg-primary h-full rounded-full w-3/4 transition-all duration-500 shadow-inner"></div>
          </div>
          <div className="mt-space-xs flex justify-between items-center text-label-sm font-label-sm text-secondary">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-xs" data-icon="verified">
                verified
              </span>
              Milestone: Botanical Mug
            </span>
            <span className="font-bold text-primary">75%</span>
          </div>
        </section>

        {/* Horizontal Carousel: Recently Started Courses */}
        <section className="flex flex-col gap-space-sm">
          <div className="flex justify-between items-center">
            <a
              className="inline-flex items-center gap-1 text-headline-sm font-headline-sm text-on-surface hover:text-primary transition-colors group"
              href="#my-courses"
              onClick={(e) => {
                e.preventDefault()
                handleTabClick('my-courses')
              }}
            >
              <span>Recently Started Courses</span>
              <span
                className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform"
                data-icon="chevron_right"
              >
                chevron_right
              </span>
            </a>
            <span className="text-label-sm font-label-sm text-secondary bg-surface-container px-2 py-1 rounded-full">
              2 Active
            </span>
          </div>

          {/* Horizontal Scrollable Carousel Container */}
          <div className="flex gap-space-md overflow-x-auto pb-space-xs no-scrollbar -mx-space-md px-space-md snap-x snap-mandatory">
            
            {/* Carousel Card 1: 50/50 Split */}
            <article className="snap-start shrink-0 w-[280px] h-[170px] bg-surface-container-low rounded-2xl border border-outline-variant/40 flex overflow-hidden soft-tactile-shadow">
              {/* Left 50% Image Mask */}
              <div className="w-1/2 h-full relative overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="A close-up of hands gently shaping a ceramic coffee mug on a rotating pottery wheel in a sunlit artisanal workshop."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAELuLzOucW5Y3AEqQnDra-gIFgFgti-DqDaENhpETtE1oWlP0FIVVukixUSPErstiiN6b44ASnSRSpFig5GtyT2AUCcnQmlJHcdbQ_MD-ftz_y4K82rTOr836n5P0ENluFc7k8LV_X5dM_uE6TllXLPSdJfvgb-aCY9nu3Do_mXcu0yvqGszyRRhyZuVMKZ_ZsPpGOdI3d5uZILtQvpuZKV2c0MtA41RIyFxSKGZKhiEWXhqY5PUjXzw"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-label-sm shadow-sm">
                  Beginner
                </div>
              </div>
              {/* Right 50% Content */}
              <div className="w-1/2 p-space-sm flex flex-col justify-between bg-surface-container-lowest">
                <div>
                  <span className="text-label-sm font-label-sm text-secondary">
                    CERAMICS
                  </span>
                  <h2 className="text-body-md font-body-md font-bold text-on-surface leading-tight mt-0.5 line-clamp-2">
                    Handbuilt Rustic Pinch Pots
                  </h2>
                  <div className="flex items-center gap-1 text-label-sm font-label-sm text-on-surface-variant mt-1">
                    <span className="material-symbols-outlined text-xs" data-icon="schedule">
                      schedule
                    </span>
                    <span>15 min left</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-label-sm font-label-sm text-on-surface-variant mb-1">
                    <span>Progress</span>
                    <span className="text-primary font-bold">60%</span>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full w-[60%]"></div>
                  </div>
                </div>
              </div>
            </article>

            {/* Carousel Card 2: 50/50 Split */}
            <article className="snap-start shrink-0 w-[280px] h-[170px] bg-surface-container-low rounded-2xl border border-outline-variant/40 flex overflow-hidden soft-tactile-shadow">
              {/* Left 50% Image Mask */}
              <div className="w-1/2 h-full relative overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="A flat lay photograph of colorful pastel yarn skeins, smooth wooden knitting needles, and a partially finished chunky knit blanket."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuGnvtYPE1BwZsD4_NPXNg-kSz8aN-Ir8DUqJ0vbMPHtOcuhO_QRh0iq7cUO6ZXBAVnwnyjU-YI0DR-asQb1NS0dHaXtW9YcNlvqzzMBCodtBeiEkrsQs_F_7j16qw5rbQ-ODWPyIvU5CovP4ruhfzglM1yJ5mn9GrBuqC0nfcyucT03KR1G2a9bHqk1fa5mIroi0oa7atMOgSDjlYbla72EjNY_4ffATz2cavsn5C_p-ITuWtk3BkNg"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-label-sm font-label-sm shadow-sm">
                  Intermediate
                </div>
              </div>
              {/* Right 50% Content */}
              <div className="w-1/2 p-space-sm flex flex-col justify-between bg-surface-container-lowest">
                <div>
                  <span className="text-label-sm font-label-sm text-secondary">
                    TEXTILES
                  </span>
                  <h2 className="text-body-md font-body-md font-bold text-on-surface leading-tight mt-0.5 line-clamp-2">
                    Cozy Cable Knit Coasters
                  </h2>
                  <div className="flex items-center gap-1 text-label-sm font-label-sm text-on-surface-variant mt-1">
                    <span className="material-symbols-outlined text-xs" data-icon="schedule">
                      schedule
                    </span>
                    <span>40 min left</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-label-sm font-label-sm text-on-surface-variant mb-1">
                    <span>Progress</span>
                    <span className="text-primary font-bold">25%</span>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full w-[25%]"></div>
                  </div>
                </div>
              </div>
            </article>

            {/* Carousel Card 3: 50/50 Split */}
            <article className="snap-start shrink-0 w-[280px] h-[170px] bg-surface-container-low rounded-2xl border border-outline-variant/40 flex overflow-hidden soft-tactile-shadow">
              {/* Left 50% Image Mask */}
              <div className="w-1/2 h-full relative overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="An artist palette with pressed botanical leaves and delicate watercolor wash samples in ochre, soft peach, terracotta, and olive sage colors."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDtIqjA0Jtdza9PNJqY3fSpMBD24bgCCN8fGKdJ6vTyG4O_DTDgVhV0scrCaRtz1qsq3mZD8vfvuHsTcwX2SlSi0ye_fB4PlACjTUF0g8wJeAQJEhe9JJUu4yA6gfhLkLF2xxLPF0Bs6S1UFQL-l6MT1JJWLqHbHaogYtO9yZZHpBj0vmQbkSg-Izl185po80d9tDQFjTJOONmYM1ivTMSdvsaomEwtSpVofsHbmhzTyR_7ZLSxFi_TQ"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-label-sm shadow-sm">
                  Beginner
                </div>
              </div>
              {/* Right 50% Content */}
              <div className="w-1/2 p-space-sm flex flex-col justify-between bg-surface-container-lowest">
                <div>
                  <span className="text-label-sm font-label-sm text-secondary">
                    PAINTING
                  </span>
                  <h2 className="text-body-md font-body-md font-bold text-on-surface leading-tight mt-0.5 line-clamp-2">
                    Pressed Floral Watercolor Wash
                  </h2>
                  <div className="flex items-center gap-1 text-label-sm font-label-sm text-on-surface-variant mt-1">
                    <span className="material-symbols-outlined text-xs" data-icon="schedule">
                      schedule
                    </span>
                    <span>10 min left</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-label-sm font-label-sm text-on-surface-variant mb-1">
                    <span>Progress</span>
                    <span className="text-primary font-bold">85%</span>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full w-[85%]"></div>
                  </div>
                </div>
              </div>
            </article>

          </div>
        </section>

        {/* Category Filter Pills */}
        <section className="flex gap-2 overflow-x-auto no-scrollbar -mx-space-md px-space-md py-1">
          {categories.map((category) => {
            const isSelected = selectedCategory === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-1.5 text-label-md font-label-md shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-sm active:scale-95'
                    : 'bg-surface-container text-on-surface-variant border border-outline-variant/50 hover:bg-surface-container-high'
                }`}
              >
                {category}
              </button>
            )
          })}
        </section>

        {/* Trending Crafts Section: Bento Grid */}
        <section className="flex flex-col gap-space-sm pb-space-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-headline-sm font-headline-sm text-on-surface">
              Trending Crafts
            </h2>
            <button
              type="button"
              onClick={() => handleTabClick('courses')}
              className="text-label-md font-label-md text-primary font-bold flex items-center hover:underline cursor-pointer"
            >
              Explore All
              <span className="material-symbols-outlined text-sm ml-0.5" data-icon="arrow_forward">
                arrow_forward
              </span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            
            {/* Bento Card 1: 50/50 Square Format (Pottery) */}
            <article className="bg-surface-container-low border border-outline-variant/40 rounded-2xl overflow-hidden flex flex-col soft-tactile-shadow">
              <div className="h-28 w-full relative overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="A set of handcrafted stoneware ceramic cups with matte glazes in warm terracotta and sand tones."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtmCYSa5QuOaX5Yb-wQm2Q1vaiHM_YIijXuTHs8Zc75r_3Cl_n3t_RoML_GqlONRwvoROYdbpKz5EvxOnwq81iLzxnq6y5jv5lX3pVuvOh7vJylSd8akFEW8XJ5XDJR3UoErUdn1JLQSl7CWjMH_xL2TueLAbjWxj9rez1RKEPiCAem3t7EopP1ICGVuCDBAfSwgHNydFYcjMIbVzZZOup52RrzxkNa0nNRDprEx2q6crNel6Qjkqaew"
                />
                <button
                  type="button"
                  aria-label="Add to favorites"
                  onClick={() => toggleFavorite('card-1')}
                  className="absolute top-2 right-2 bg-surface/90 backdrop-blur-sm rounded-full p-1 text-primary shadow-xs cursor-pointer active:scale-90 transition-transform"
                >
                  <span
                    className="material-symbols-outlined text-xs"
                    data-icon="favorite"
                    style={{ fontVariationSettings: favorites['card-1'] ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
              </div>
              <div className="p-space-sm flex flex-col justify-between flex-1 bg-surface-container-lowest">
                <div>
                  <span className="text-label-sm font-label-sm text-secondary">
                    POTTERY
                  </span>
                  <h3 className="text-label-lg font-label-lg text-on-surface line-clamp-1 mt-0.5">
                    Matte Glaze Mugs
                  </h3>
                  <p className="text-body-sm font-body-sm text-on-surface-variant line-clamp-1">
                    By Clara Vance
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-outline-variant/30">
                  <span className="text-label-sm font-label-sm text-primary flex items-center gap-0.5">
                    <span
                      className="material-symbols-outlined text-xs"
                      data-icon="star"
                      data-weight="fill"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    4.9 (128)
                  </span>
                  <span className="text-label-sm font-label-sm bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-full">
                    3 lessons
                  </span>
                </div>
              </div>
            </article>

            {/* Bento Card 2: 50/50 Square Format (Weaving) */}
            <article className="bg-surface-container-low border border-outline-variant/40 rounded-2xl overflow-hidden flex flex-col soft-tactile-shadow">
              <div className="h-28 w-full relative overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="A close-up of a handmade macrame wall hanging composed of natural unbleached cotton cord and wooden beads."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEXe-z1tm4CU3wlmsUmh6u6utlZld2i5-JaUdGTRnc22MJwt1vhmmnLOUvEKqPIDItyFZp5y8u5QD8vqY_yOB6_ESrQ8p-55WYZyzorQY6LWEQU17GqA6C1W2YSwflIcbkj_O2o_GRtd7xZcgGEM1woV7xdainVc1q-S812VkoPOBHq_83PA7cEjzNymRgyV7l_n5IhtGAYqFNoaatiTBoqNjVFQ6WSCaF4pdRTA2YGTx6dr4b0IBSAA"
                />
                <button
                  type="button"
                  aria-label="Add to favorites"
                  onClick={() => toggleFavorite('card-2')}
                  className="absolute top-2 right-2 bg-surface/90 backdrop-blur-sm rounded-full p-1 text-on-surface-variant hover:text-primary transition-colors shadow-xs cursor-pointer active:scale-90"
                >
                  <span
                    className="material-symbols-outlined text-xs"
                    data-icon="favorite"
                    style={{ fontVariationSettings: favorites['card-2'] ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
              </div>
              <div className="p-space-sm flex flex-col justify-between flex-1 bg-surface-container-lowest">
                <div>
                  <span className="text-label-sm font-label-sm text-secondary">
                    WEAVING
                  </span>
                  <h3 className="text-label-lg font-label-lg text-on-surface line-clamp-1 mt-0.5">
                    Macrame Wall Art
                  </h3>
                  <p className="text-body-sm font-body-sm text-on-surface-variant line-clamp-1">
                    By Julian Sol
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-outline-variant/30">
                  <span className="text-label-sm font-label-sm text-primary flex items-center gap-0.5">
                    <span
                      className="material-symbols-outlined text-xs"
                      data-icon="star"
                      data-weight="fill"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    4.8 (94)
                  </span>
                  <span className="text-label-sm font-label-sm bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-full">
                    5 lessons
                  </span>
                </div>
              </div>
            </article>

            {/* Large Featured Spotlight Card */}
            <article className="col-span-2 bg-surface-container rounded-2xl p-space-md border border-outline-variant/40 flex items-center justify-between gap-space-md">
              <div className="flex flex-col gap-1 max-w-[200px]">
                <span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed text-label-sm font-label-sm rounded-full w-fit">
                  Editor's Pick
                </span>
                <h3 className="text-headline-sm font-headline-sm text-primary leading-tight">
                  Pressed Lavender Candle Dipping
                </h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant">
                  Master natural beeswax scents &amp; floral embeds.
                </p>
                <button
                  className="mt-2 bg-primary text-on-primary rounded-full px-3 py-1.5 text-label-md font-label-md font-bold self-start active:scale-95 transition-transform shadow-sm cursor-pointer"
                  type="button"
                >
                  Start Workshop
                </button>
              </div>
              <div className="w-24 h-28 rounded-xl overflow-hidden shrink-0 border border-outline-variant/50">
                <img
                  className="w-full h-full object-cover"
                  alt="A bundle of aromatic dried lavender sprigs next to a warm hand-dipped beeswax pillar candle sitting on a natural wood slice."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJXPIKtkF9CtajX17uMg5DF4-PRvqAgyGnrTnbGM0QnoMFdVwWFwLaoLBNZOgHDomfQsw3a7U45-U_VI1s6n-VXPcsdaSc2cyL8kWRkpfP6zFqKFp-MLX6Rd8oyl1Ktd0i7fUzvLJzCN96vh9uQH8i_HtWdUsqA2yPguOAINP8LYb5LUrZRadXSJM0YMh8xPW6VEXOl4tFiCP_asSxYRxHojAWKtxNjb4ZeoI28t57BDhXXsujxqX7iA"
                />
              </div>
            </article>

          </div>
        </section>

      </main>

      {/* 3. Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 w-full z-50 flex justify-around items-center px-space-md py-space-xs max-w-[430px] mx-auto bg-surface dark:bg-inverse-surface shadow-lg dark:shadow-none">
        
        {/* Nav Item 1: Home */}
        <button
          type="button"
          onClick={() => handleTabClick('home')}
          className={`flex flex-col items-center justify-center px-space-md py-space-xs rounded-full transition-all duration-200 cursor-pointer ${
            activeTab === 'home'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant dark:text-surface-variant hover:text-on-surface hover:bg-surface-container-high active:scale-95'
          }`}
        >
          <span
            className="material-symbols-outlined"
            data-icon="home"
            style={{ fontVariationSettings: activeTab === 'home' ? "'FILL' 1" : "'FILL' 0" }}
          >
            home
          </span>
          <span className="text-label-sm font-label-sm font-semibold">Home</span>
        </button>

        {/* Nav Item 2: Courses */}
        <button
          type="button"
          onClick={() => handleTabClick('courses')}
          className={`flex flex-col items-center justify-center px-space-md py-space-xs rounded-full transition-all duration-200 cursor-pointer ${
            activeTab === 'courses'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant dark:text-surface-variant hover:text-on-surface hover:bg-surface-container-high active:scale-95'
          }`}
        >
          <span
            className="material-symbols-outlined"
            data-icon="grid_view"
            style={{ fontVariationSettings: activeTab === 'courses' ? "'FILL' 1" : "'FILL' 0" }}
          >
            grid_view
          </span>
          <span className="text-label-sm font-label-sm font-semibold">Courses</span>
        </button>

        {/* Nav Item 3: My Courses */}
        <button
          type="button"
          onClick={() => handleTabClick('my-courses')}
          className={`flex flex-col items-center justify-center px-space-md py-space-xs rounded-full transition-all duration-200 cursor-pointer ${
            activeTab === 'my-courses'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant dark:text-surface-variant hover:text-on-surface hover:bg-surface-container-high active:scale-95'
          }`}
        >
          <span
            className="material-symbols-outlined"
            data-icon="auto_stories"
            style={{ fontVariationSettings: activeTab === 'my-courses' ? "'FILL' 1" : "'FILL' 0" }}
          >
            auto_stories
          </span>
          <span className="text-label-sm font-label-sm font-semibold">My Courses</span>
        </button>

      </nav>

    </div>
  )
}

