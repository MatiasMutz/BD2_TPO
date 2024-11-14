const mongoose = require("mongoose");
const Factura = require("../../../models/facturaModel");
const DetalleFactura = require("../../../models/detalleFacturaModel");
require("dotenv").config();

async function getBillsWithIpsumProducts() {
  console.log("\n🔍 Obteniendo facturas con productos Ipsum...");
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const facturas = await Factura.aggregate([
      {
        // First, join Factura with DetalleFactura based on nro_factura
        $lookup: {
          from: "detallefacturas", // collection name in MongoDB
          localField: "nro_factura",
          foreignField: "nro_factura",
          as: "detalles",
        },
      },
      {
        // Now join with Producto based on codigo_producto
        $lookup: {
          from: "productos", // collection name in MongoDB
          localField: "detalles.codigo_producto",
          foreignField: "codigo_producto",
          as: "producto",
        },
      },
      {
        // Filter for products where the brand (marca) is 'Ipsum'
        $match: {
          "producto.marca": "Ipsum",
        },
      },
    ]);

    if (!facturas.length) {
      console.log("❌ No se encontraron facturas con productos Ipsum");
      return;
    }

    console.log(
      `📋 Se encontraron ${facturas.length} facturas con productos Ipsum\n\n`
    );

    console.log("--------------------------");
    facturas.forEach((factura) => {
      console.log(`📄 Número de factura: ${factura.nro_factura}`);
      console.log(`📅 Fecha: ${factura.fecha}`);
      console.log(`💵 Total sin IVA: ${factura.total_sin_iva}`);
      console.log(`💵 Total con IVA: ${factura.total_con_iva}`);
      console.log(`💰 IVA: ${factura.iva}`);
      console.log("--------------------------");
    });
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

getBillsWithIpsumProducts();
