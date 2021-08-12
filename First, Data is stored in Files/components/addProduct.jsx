import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import http from "../services/httpService";

const productValidationSchema = Yup.object().shape({
  productName: Yup.string().required(),
  category: Yup.string().required(),
  description: Yup.string().required(),
});

class AddProduct extends Component {
  async postData(url, obj) {
    let response = await http.post(url, obj);
  }

  async putData(url, obj) {
    let response = await http.put(url, obj);
  }

  handleSubmit = (obj, id) => {
    let obj1 = { category: obj.category, description: obj.description };
    id
      ? this.putData(`/products/${id}`, obj1)
      : this.postData("/products", obj);
  };

  render() {
    let { products = [] } = this.props;
    console.log(products);
    const { id } = this.props.match.params;
    let pr = products.find((ele) => ele.productId == id);
    let product = pr ? pr : {};
    console.log(product);
    return (
      <div className="container">
        <Formik
          initialValues={{
            productName: product.productName || "",
            category: product.category || "",
            description: product.description || "",
          }}
          validationSchema={productValidationSchema}
          onSubmit={(values) => {
            this.handleSubmit(values, id);
            alert(
              id ? "product updated successfully" : "product added successfully"
            );
            window.location = "/product/view";
          }}
        >
          {() => (
            <Form>
              <h4 className="py-2 text-center">Details of product</h4>
              <div className="mb-3">
                <label htmlFor="name">Product Name</label>
                <Field
                  name="productName"
                  type="text"
                  placeholder="Enter Product Name"
                  disabled={id}
                  className="form-control"
                />
                <div className="text-danger">
                  <ErrorMessage name="productName" />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="name">category</label>
                <Field
                  name="category"
                  type="text"
                  placeholder="Enter Category"
                  className="form-control"
                />
                <div className="text-danger">
                  <ErrorMessage name="category" />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="name">Description</label>
                <Field
                  name="description"
                  type="text"
                  placeholder="Enter Description"
                  className="form-control"
                />
                <div className="text-danger">
                  <ErrorMessage name="description" />
                </div>
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary me-2">
                  {id ? "Update" : "Add"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
export default AddProduct;
