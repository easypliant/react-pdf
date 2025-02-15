// Note that this file is ran using a separate Vitest configuration
import { describe, expect, it, vi } from "vitest";
import { render, waitFor, screen } from "@testing-library/react";
import {
  BlobProvider,
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  Text,
} from "@easypliant/react-pdf-renderer";

const TestDocument = ({ title = "Default" }) => (
  <Document title={title}>
    <Page>
      <Text>Hello tests</Text>
    </Page>
  </Document>
);

describe("BlobProvider", () => {
  it("works", async () => {
    const renderFunction = vi.fn();

    render(<BlobProvider document={<TestDocument />}>{renderFunction}</BlobProvider>);

    await waitFor(() => expect(renderFunction).toBeCalledTimes(3));

    expect(renderFunction).toHaveBeenCalledWith(
      expect.objectContaining({
        blob: expect.anything(),
        url: expect.anything(),
        error: null,
        loading: false,
      }),
    );
  });
});

describe("BlobProvider", () => {
  it("works", async () => {
    const renderFunction = vi.fn();

    render(<BlobProvider document={<TestDocument />}>{renderFunction}</BlobProvider>);

    await waitFor(() => expect(renderFunction).toBeCalledTimes(3));

    expect(renderFunction).toHaveBeenCalledWith(
      expect.objectContaining({
        blob: expect.anything(),
        url: expect.anything(),
        error: null,
        loading: false,
      }),
    );
  });
});

describe("BlobProvider", () => {
  it("works", async () => {
    const { container } = render(
      <PDFViewer>
        <TestDocument />
      </PDFViewer>,
    );

    await waitFor(() => expect(container.querySelector("iframe")));
  });
});

describe("PDFDownloadLink", () => {
  it("works", async () => {
    render(<PDFDownloadLink document={<TestDocument />}>test</PDFDownloadLink>);

    const link = await screen.findByText("test");
    expect(link.getAttribute("download")).toBe("document.pdf");
  });
});
