import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFF",
  },
  productContainer: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productDetails: {
    marginLeft: 10,
  },
  productName: {
    fontSize: 18,
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "green",
  },
});

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // We'll use this for the API endpoint
}

interface Template {
  id: string;
  name: string;
  layout: {
    type: string;
    position: string;
    fields: string[];
  }[];
}

// Utility function to chunk array into smaller arrays
const chunkArray = (array: Product[], chunkSize: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

// Define the PDF template component
interface PdfCatalogueProps {
  template: Template;
  products: Product[];
}

const PdfCatalogue: React.FC<PdfCatalogueProps> = ({ template, products }) => {
  // Assume each page can fit 2 products for simplicity
  const productsPerPage = 2;
  const productChunks = chunkArray(products, productsPerPage);

  return (
    <Document>
      {productChunks.map((chunk, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          {chunk.map((product, index) => (
            <View key={index} style={styles.productContainer}>
              <Image src={product.imageUrl} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>
                  {product.description}
                </Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
            </View>
          ))}
        </Page>
      ))}
    </Document>
  );
};

export default PdfCatalogue;
