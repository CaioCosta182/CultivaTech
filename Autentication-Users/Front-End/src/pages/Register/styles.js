// src/pages/Register/styles.js
import styled from "styled-components";
import { defaultTheme } from "../../theme";

// Função helper para acessar valores do tema com fallback
const getThemeValue = (path, defaultValue) => (props) => {
  const keys = path.split(".");
  let value = props.theme || defaultTheme;

  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) return defaultValue;
  }

  return value || defaultValue;
};

export const Container = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme?.colors?.white || "#ffffff"};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h2 {
    color: ${({ theme }) => theme?.colors?.primary || "#4361ee"};
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }

  @media (max-width: 600px) {
    margin: 1rem;
    padding: 1.5rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Input = styled.input`
  width: 98%;
  padding: 0.8rem 1rem;
  border: 1px solid
    ${(props) =>
      props.hasError
        ? getThemeValue("colors.error", defaultTheme.colors.error)(props)
        : getThemeValue(
            "colors.grayLight",
            defaultTheme.colors.grayLight
          )(props)};
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.hasError
        ? getThemeValue("colors.error", defaultTheme.colors.error)(props)
        : getThemeValue("colors.primary", defaultTheme.colors.primary)(props)};
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.hasError
          ? getThemeValue(
              "colors.errorLight",
              defaultTheme.colors.errorLight
            )(props)
          : getThemeValue(
              "colors.primaryLight",
              defaultTheme.colors.primaryLight
            )(props)};
  }

  &::placeholder {
    color: ${getThemeValue("colors.gray", defaultTheme.colors.gray)};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid
    ${getThemeValue("colors.grayLight", defaultTheme.colors.grayLight)};
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${getThemeValue(
      "colors.primary",
      defaultTheme.colors.primary
    )};
    box-shadow: 0 0 0 2px
      ${getThemeValue("colors.primaryLight", defaultTheme.colors.primaryLight)};
  }
`;

export const Button = styled.button`
  background-color: ${getThemeValue(
    "colors.primary",
    defaultTheme.colors.primary
  )};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 0.5rem;

  &:hover {
    background-color: ${getThemeValue(
      "colors.primaryDark",
      defaultTheme.colors.primaryDark
    )};
  }

  &:disabled {
    background-color: ${getThemeValue("colors.gray", defaultTheme.colors.gray)};
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.span`
  color: ${getThemeValue("colors.error", defaultTheme.colors.error)};
  font-size: 0.8rem;
  margin-top: 0.2rem;
  display: block;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  label {
    font-size: 0.9rem;
    color: ${getThemeValue("colors.grayDark", defaultTheme.colors.grayDark)};
    font-weight: 500;
  }
`;
