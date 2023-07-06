/*
  Warnings:

  - You are about to drop the column `city_id` on the `bus_routes` table. All the data in the column will be lost.
  - You are about to drop the column `ends_in_id` on the `bus_routes` table. All the data in the column will be lost.
  - You are about to drop the column `starts_in_id` on the `bus_routes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bus_routes" DROP CONSTRAINT "bus_routes_city_id_fkey";

-- DropForeignKey
ALTER TABLE "bus_routes" DROP CONSTRAINT "bus_routes_ends_in_id_fkey";

-- DropForeignKey
ALTER TABLE "bus_routes" DROP CONSTRAINT "bus_routes_starts_in_id_fkey";

-- AlterTable
ALTER TABLE "bus_routes" DROP COLUMN "city_id",
DROP COLUMN "ends_in_id",
DROP COLUMN "starts_in_id";
