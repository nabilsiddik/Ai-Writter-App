import WooCommerceProductForm from "@/components/forms/WoocommerceProductForm"
import PageHeader from "@/components/shared/PageHeader"

const WoocommerceWriterPage = () => {
  return (
    <div>
        <PageHeader title="Woocommerce Product Writter" description={'Automate your woocommerce product writting. Give some details and Ai will write you SEO friendly product details and upload directly to your woocommerce store.'}/>
        <WooCommerceProductForm/>
    </div>
  )
}

export default WoocommerceWriterPage