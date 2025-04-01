import React from 'react';
import {
    Grid,
    Container,
    useTheme,
} from '@mui/material';
import {
    StatsCard,
    MediaCard,
    PropertyCard,
    PricingCard,
    TestimonialCard,
    ComplexCard,
    UserProfileCard,
    BookingCard,
    FeatureHighlightCard,
    ComparisonCard,
    TimelineCard,
    WeatherCard,
    MapCard,
    NeighborhoodCard,
    InvestmentCard
} from '../atoms/Card';
import {
    Security,
    LocalFireDepartment,
} from '@mui/icons-material';

import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Favorite from '@mui/icons-material/Favorite';
import { KingBed, Bathtub, LocalParking } from '@mui/icons-material';

export const CardGallery = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <center><h1>Card Gallery</h1></center>

            {/* Sección de todas las cards en un solo grupo */}
            <Grid container spacing={4}>
                {/* StatsCard */}
                <Grid item xs={12} md={6} lg={4}>
                    <StatsCard
                        title="Propiedades Disponibles"
                        value="350"
                        icon={<ShoppingCart />}
                        color="primary"
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <StatsCard
                        title="Clientes Satisfechos"
                        value="1,230"
                        icon={<Favorite />}
                        color="secondary"
                    />
                </Grid>

                {/* MediaCard */}
                <Grid item xs={12} md={6} lg={4}>
                    <MediaCard
                        image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
                        title="Casa Moderna"
                        subtitle="Ubicada en Monterrey"
                        content="Descubre esta hermosa casa moderna con acabados de lujo."
                        actions
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <MediaCard
                        image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
                        title="Departamento en el Centro"
                        content="Un departamento ideal para quienes buscan comodidad y ubicación."
                        sx={{ bgcolor: theme.palette.background.paper }}
                    />
                </Grid>

                {/* PricingCard */}
                <Grid item xs={12} md={6} lg={4}>
                    <PricingCard
                        title="Casa Familiar"
                        price="$250,000"
                        period="USD"
                        features={["3 Recámaras", "2 Baños", "Cochera para 2 autos"]}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <PricingCard
                        title="Penthouse de Lujo"
                        price="$1,200,000"
                        period="USD"
                        features={["4 Recámaras", "Vista Panorámica", "Amenidades Exclusivas"]}
                        recommended
                    />
                </Grid>

                {/* TestimonialCard */}
                <Grid item xs={12} md={6} lg={4}>
                    <TestimonialCard
                        image="https://images.unsplash.com/photo-1457449940276-e8deed18bfff"
                        name="Ana Pérez"
                        role="Compradora de Propiedad"
                        text="Encontré la casa de mis sueños gracias a esta plataforma. ¡Recomendado!"
                        rating={5}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <TestimonialCard
                        image="https://images.unsplash.com/photo-1457449940276-e8deed18bfff"
                        name="Carlos Gómez"
                        role="Inversionista"
                        text="Excelente servicio y opciones de inversión en bienes raíces."
                        rating={4}
                    />
                </Grid>

                {/* PropertyCard */}
                <Grid item xs={12} md={6} lg={4}>
                    <PropertyCard
                        image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
                        title="Casa en la Playa"
                        location="Cancún, México"
                        price="$250,000"
                        rating={4.8}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <PropertyCard
                        image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
                        title="Apartamento Moderno"
                        location="Ciudad de México, México"
                        price="$120,000"
                        rating={4.5}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <PropertyCard
                        image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
                        title="Cabaña en el Bosque"
                        location="Valle de Bravo, México"
                        price="$180,000"
                        rating={4.9}
                    />
                </Grid>

                {/* ComplexCard */}
                <Grid item xs={12} md={6} lg={4}>
                    <ComplexCard
                        header="Propiedad Exclusiva"
                        title="Villa de Lujo"
                        subtitle="Ubicada en Los Cabos"
                        image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
                        content="Una villa de lujo con vistas impresionantes al mar."
                        tags={["Lujo", "Exclusiva", "Vista al Mar"]}
                        actions
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <ComplexCard
                        title="Terreno Amplio"
                        subtitle="Ideal para Proyectos"
                        image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
                        content="Terreno amplio perfecto para construir tu proyecto ideal."
                        tags={["Terreno", "Construcción", "Inversión"]}
                        sx={{
                            border: `2px solid ${theme.palette.secondary.main}`,
                            boxShadow: theme.shadows[4]
                        }}
                    />
                </Grid>

                {/* UserProfileCard */}
                <Grid item xs={12} md={6} lg={4}>
                    <UserProfileCard
                        user={{
                            avatar: "https://images.unsplash.com/photo-1457449940276-e8deed18bfff",
                            name: "Carlos Martínez",
                            role: "Agente Certificado",
                            rating: 4.8
                        }}
                    />
                </Grid>

                {/* BookingCard */}
                <Grid item xs={12} md={6} lg={4}>
                    <BookingCard price="1,200" />
                </Grid>

                {/* FeatureHighlightCard */}
                <Grid item xs={12} md={6} lg={4}>
                    <FeatureHighlightCard
                        icon={<Security />}
                        title="Seguridad 24/7"
                        description="Sistema de seguridad avanzado con vigilancia constante"
                    />
                </Grid>

                {/* ComparisonCard */}
                <Grid item xs={12} md={6} lg={4}>
                    <ComparisonCard
                        items={[
                            {
                                title: "Casa Moderna",
                                features: [
                                    { icon: <KingBed />, text: "3 Recámaras" },
                                    { icon: <Bathtub />, text: "2 Baños" },
                                    { icon: <LocalParking />, text: "Cochera" }
                                ]
                            },
                            {
                                title: "Departamento",
                                features: [
                                    { icon: <KingBed />, text: "2 Recámaras" },
                                    { icon: <Bathtub />, text: "1 Baño" },
                                    { icon: <LocalParking />, text: "Estacionamiento" }
                                ]
                            }
                        ]}
                    />
                </Grid>

                {/* TimelineCard */}
                <Grid item xs={12} md={6} lg={4}>
                    <TimelineCard
                        events={[
                            {
                                year: "2020",
                                title: "Construcción",
                                description: "Se completó la construcción de la propiedad"
                            },
                            {
                                year: "2021",
                                title: "Primera Venta",
                                description: "La propiedad fue vendida por primera vez"
                            }
                        ]}
                    />
                </Grid>

                {/* WeatherCard */}
                <Grid item xs={12} md={6} lg={4}>
                    <WeatherCard temperature="25" condition="sunny" />
                </Grid>

                {/* MapCard */}
                <Grid item xs={12} md={6} lg={4}>
                    <MapCard location="Monterrey, México" />
                </Grid>

                {/* NeighborhoodCard */}
                <Grid item xs={12} md={6} lg={4}>
                    <NeighborhoodCard
                        amenities={[
                            { icon: <LocalParking />, name: "Estacionamiento", distance: "100m" },
                            { icon: <LocalFireDepartment />, name: "Parque", distance: "200m" }
                        ]}
                    />
                </Grid>

                {/* InvestmentCard */}
                <Grid item xs={12} md={6} lg={4}>
                    <InvestmentCard
                        metrics={[
                            { label: "ROI Anual", value: "8.5%" },
                            { label: "Valorización", value: "12%" }
                        ]}
                    />
                </Grid>
            </Grid>

        </Container>
    );
};