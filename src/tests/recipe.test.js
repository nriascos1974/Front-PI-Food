// Configuramos test
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// Importamos variables/componentes
import NewRecipe from "../src/components/NewRecipe/NewRecipe";

configure({ adapter: new Adapter() });

describe("New Recipe", () => {
  let newRecipe;
  beforeEach(() => {
    newRecipe = shallow(<NewRecipe />);
  });

  it("Debería renderizar un <form>", () => {
    expect(newRecipe.find("form")).toHaveLength(1);
  });

  it("Debería renderizar un label para el titulo de la receta con el texto 'Title'", () => {
    expect(newRecipe.find("label").at(0).text()).toEqual("Title");
  });

  it("Debería renderizar un input para el Titulo de la receta con los atributos name y type", () => {
    const inputName = newRecipe.find("input").at(0);
    expect(inputName.props()).toEqual({
      ...inputName.props(),
      name: "title",
      type: "text",
    });
  });

  it("Debería renderizar un label para el resumen de la receta con el texto 'Summary'", () => {
    expect(newRecipe.find("label").at(1).text()).toEqual("Summary");
  });

  it("Debería renderizar un textarea para el resumen de la receta con los atributos name, maxLength y type", () => {
    const inputMessage = contact.find("textarea").at(0);
    expect(inputMessage.props()).toEqual({
      ...inputMessage.props(),
      name: "summary",
      type: "text",
      maxLength: "1000",
    });
  });

  it("Debería renderizar un label para la puntuacion de salud de la receta con el texto 'Health Score'", () => {
    expect(newRecipe.find("label").at(2).text()).toEqual("Health Score");
  });

  it("Debería renderizar un input para para la puntuacion de salud de la receta con los atributos name, min, max y type", () => {
    const inputName = newRecipe.find("input").at(2);
    expect(inputName.props()).toEqual({
      ...inputName.props(),
      name: "healthScore",
      type: "range",
      min: "0",
      max: "100",
    });
  });

  it("Debería renderizar un botón con el atributo type que sea submit y con el texto 'Create Recipe'", () => {
    const button = contact.find("button");
    expect(button.props()).toEqual({
      ...button.props(),
      type: "submit",
    });
    expect(button.text()).toEqual("Create Recipe");
  });
});
