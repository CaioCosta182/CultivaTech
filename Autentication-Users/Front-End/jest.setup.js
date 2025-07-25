import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Adiciona TextEncoder e TextDecoder ao escopo global para os testes
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
