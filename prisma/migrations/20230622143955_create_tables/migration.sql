-- CreateTable
CREATE TABLE "bus_routes" (
    "id" TEXT NOT NULL,
    "previous_id" INTEGER NOT NULL,
    "previous_parent_key" INTEGER,
    "bus_route_number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "operator" TEXT,
    "operator_id" TEXT,
    "count_permit_holders" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "starts_in_id" TEXT NOT NULL,
    "ends_in_id" TEXT NOT NULL,
    "city_id" TEXT,

    CONSTRAINT "bus_routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "popular_bus_routes" (
    "id" TEXT NOT NULL,
    "number_of_views" INTEGER NOT NULL DEFAULT 0,
    "bus_route_id" TEXT NOT NULL,

    CONSTRAINT "popular_bus_routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL,
    "ibge_code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cover_url" TEXT,
    "count_origin_views" INTEGER NOT NULL DEFAULT 0,
    "count_destiny_views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "places" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "legacy_id" INTEGER NOT NULL,

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itineraries" (
    "id" TEXT NOT NULL,
    "legacy_id" INTEGER NOT NULL,
    "legacy_bus_route_id" INTEGER NOT NULL,
    "bus_route_id" TEXT NOT NULL,

    CONSTRAINT "itineraries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "places_itineraries" (
    "id" TEXT NOT NULL,
    "section_number" INTEGER NOT NULL,
    "is_access" BOOLEAN NOT NULL,
    "itinerary_id" TEXT NOT NULL,
    "place_id" TEXT NOT NULL,

    CONSTRAINT "places_itineraries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timetables" (
    "id" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "weekday" TEXT NOT NULL,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "bus_route_id" TEXT NOT NULL,

    CONSTRAINT "timetables_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bus_routes_previous_id_key" ON "bus_routes"("previous_id");

-- CreateIndex
CREATE UNIQUE INDEX "bus_routes_bus_route_number_key" ON "bus_routes"("bus_route_number");

-- CreateIndex
CREATE UNIQUE INDEX "cities_ibge_code_key" ON "cities"("ibge_code");

-- AddForeignKey
ALTER TABLE "bus_routes" ADD CONSTRAINT "bus_routes_starts_in_id_fkey" FOREIGN KEY ("starts_in_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bus_routes" ADD CONSTRAINT "bus_routes_ends_in_id_fkey" FOREIGN KEY ("ends_in_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bus_routes" ADD CONSTRAINT "bus_routes_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "popular_bus_routes" ADD CONSTRAINT "popular_bus_routes_bus_route_id_fkey" FOREIGN KEY ("bus_route_id") REFERENCES "bus_routes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_bus_route_id_fkey" FOREIGN KEY ("bus_route_id") REFERENCES "bus_routes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "places_itineraries" ADD CONSTRAINT "places_itineraries_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "itineraries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "places_itineraries" ADD CONSTRAINT "places_itineraries_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetables" ADD CONSTRAINT "timetables_bus_route_id_fkey" FOREIGN KEY ("bus_route_id") REFERENCES "bus_routes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
