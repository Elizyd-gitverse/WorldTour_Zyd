import PageNav from "../Component/PageNav"
import style from "./Product.module.css"

export default function PricePage() {
     return (
          <main className={style.product}>
              <PageNav /> 
              <section>
                   <div>
                     <h2>
                       Simple pricing.
                       <br />
                       Just $9/month.
                     </h2>
                     <p>
                       Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
                       labore mollitia iusto. Recusandae quos provident, laboriosam fugit
                       voluptatem iste.
                     </p>
                   </div>
                   <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
              </section>
          </main>
        )
}