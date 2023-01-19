import { useRouter } from "next/router"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

export default function Product() {
    const { query } = useRouter()

    return (
        <ProductContainer>
            <ImageContainer>
                Image
            </ImageContainer>

            <ProductDetails>
                <h1>Camisa X</h1>
                <span>R$ 79,90</span>

                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet laborum placeat asperiores fugiat nostrum blanditiis dolores quidem laboriosam explicabo praesentium? Velit maxime rem ipsa eaque odio amet a veniam minus.
                </p>

                <button>
                     Comprar agora
                </button>
            </ProductDetails>
        </ProductContainer>
    )
}