import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next"
import { stripe } from "../../lib/stripe"
import Stripe from "stripe";
import axios from "axios";

import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"
import { useRouter } from "next/router";

interface ProductProps {
    product: {
        id: string
        name: string
        imageUrl: string
        price: string
        description: string
        defaultPriceId: string
    }
}

export default function Product({ product }: ProductProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState<boolean>(false)

    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl

        } catch (err) {
            setIsCreatingCheckoutSession(false)
            // Conectar com uma ferrament de observabilidae (datadog / sentry)
            alert("Falha ao redirecionar ao checkout")
        }
    }

    const { isFallback } = useRouter()

    if (isFallback) { // caso ainda nao carregou meu html da pagina estatica
        return <p>Loading...</p>
    }

    return (
        <>
            <Head>
                <title> {product.name} | Ignite Shop</title>
            </Head>

            <ProductContainer>
                <ImageContainer>
                    <Image
                        src={`${product.imageUrl}`}
                        width={520}
                        height={480}
                        alt=""
                    />
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>

                    <p>
                        {product.description}
                    </p>

                    <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
                        Comprar agora
                    </button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: 'prod_NBxc4xCvhT7tbN' } }
        ],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => { // params -> pegando o id do producot que vai vim pela a url.,
    const produtId = params.id

    const product = await stripe.products.retrieve(produtId, {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(price.unit_amount / 100),
                description: product.description,
                defaultPriceId: price.id,
            }
        },
        revalidate: 60 * 60 * 1, // 1 hour
    }
}

