import { Route } from "~/routes/+types/_index";
import { Button } from "~/components/ui/button";
import { AxiosError } from "axios";

export const loader = async ({ request }: Route.LoaderArgs) => {};

export default function ColorsPage() {
  return (
    <div>
      <ColorPalette />
    </div>
  );
}

const colors = [
  "main1",
  "main2",
  "main3",
  "balance1",
  "balance2",
  "balance3",
  "vari1",
  "vari2",
  "vari3",
  "accent",
];

const shades = ["200", "300", "400", "500", "600", "700"];

const ColorPalette = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">andTopic Color Palette</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colors.map((color) => (
          <div key={color} className="text-center">
            <h2 className="text-lg font-semibold mb-2">{color}</h2>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              {shades.map((shade) => (
                <div key={`${color}-${shade}`} className="mb-4 text-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-andTopic-${color}-${shade} border border-andTopic-${color}-${shade}`}
                  ></div>
                  <p className="mt-2 text-sm font-medium text-andTopic-${color}-${shade}`">
                    {color}-{shade}
                    <br />
                    {shade === "500" ? "(Default)" : " "}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div key={"suggestion"} className="text-center">
          <h2 className="text-lg font-semibold mb-2">{"suggestion"}</h2>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <div key={`${"suggestion"}`} className="mb-4 text-center">
              <div
                className={`w-16 h-16 rounded-full bg-andTopic-suggestion border border-andTopic-suggestion`}
              ></div>
              <p className="mt-2 text-sm font-medium text-andTopic-${color}-${shade}`">
                {"suggestion"}
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
