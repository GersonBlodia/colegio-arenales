import { CursoContainer } from "@/components/home/CursoContainer"
import ITServiceSection from "@/components/home/HeroSectionComponent"
import { MainHeader } from "@/components/home/MainHeader"
import { MainHome } from "@/components/home/MainHome"
import PricingSection from "@/components/home/pricing-card/PlansComponent"
import { AccordionGroup } from "@/components/ui/Accordition/AccordionGroup"
import { UXUICard } from "@/components/ui/card/UXUICard"
import { TextNumber } from "@/components/ui/Text/TextNumber"

 


const PageHome = () => {
  return (
    <main className="relative">
        <MainHeader/>
  <MainHome  className="w-[100%]  main-home  mx-auto flex flex-col gap-16">
          <ITServiceSection/>
          <CursoContainer/>
          <PricingSection/>
          <div  className="w-full p-8  bg-white">
          <div className="w-full md:w-4/5 mx-auto flex first-letter: flex-col-reverse md:flex-row gap-8">
          <TextNumber/>
          <AccordionGroup/>
          </div>
          </div>

          <section className="w-[80%] mx-auto p-8">
            <UXUICard
          />
          </section>
  </MainHome>
  </main>
  )
}

export default PageHome
