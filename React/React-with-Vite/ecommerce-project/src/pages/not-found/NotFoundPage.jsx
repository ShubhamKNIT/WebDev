import Header from "../../components/Header";
import "./NotFoundPage.css"

export default function NotFoundPage({ cart }) {
  return (
    <>
      <Header cart={cart} />
      <div className='not-found-page'>
        <p>Page Not Found</p>
      </div>
    </>
  )
}