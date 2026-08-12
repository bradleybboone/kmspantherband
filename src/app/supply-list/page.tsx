import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Instrument Supply List",
  description:
    "Preferred instrument models and required supplies for every KMS Panther Band instrument, plus what the school provides.",
};

const supplyDocUrl =
  "https://docs.google.com/document/d/1ndtFkoyXGrlWbfTt37ef3JVKoJRArXVae2hSkAVWNJM/edit?usp=sharing";

type Instrument = {
  name: string;
  /** School-owned instruments carry the $100/yr usage fee; families buy accessories only. */
  schoolOwned?: boolean;
  models?: string;
  modelNote?: string;
  supplies: string[];
};

const instruments: Instrument[] = [
  {
    name: "Flute",
    models: "Yamaha 262Y, DiZhao DZ300, Pearl Quantz 505, Gemeinhardt 3",
    modelNote: "Preferred options: open hole with offset G",
    supplies: ["Silk cleaning cloth", "Polish cloth"],
  },
  {
    name: "Clarinet",
    models: "Buffet E11, Yamaha YCL-255, LeBlanc Serenade",
    modelNote: "Preferred options: wood or composite body",
    supplies: [
      "5RV Lyre mouthpiece",
      "Rovner 1R ligature",
      "1 box Vandoren 2.5 clarinet reeds",
      "Silk drop swab",
      "Reed guard (holds at least 4 reeds)",
      "Mouthpiece brush",
      "Cork grease",
    ],
  },
  {
    name: "Alto Saxophone",
    schoolOwned: true,
    models: "Yamaha YAS200AD, Selmer AS400",
    supplies: [
      "Vandoren Optimum AL3 mouthpiece",
      "Padded neck strap",
      "Rovner 1RL ligature",
      "Silk drop swab",
      "Reed guard (holds at least 4 reeds)",
      "1 box Vandoren 2.5 saxophone reeds",
      "Cork grease",
    ],
  },
  {
    name: "Oboe",
    schoolOwned: true,
    supplies: [
      "4 medium oboe reeds",
      "Reed case (holds at least 4 reeds)",
      "Soaker cup with stand clip",
      "Silk drop swab",
    ],
  },
  {
    name: "Bassoon",
    schoolOwned: true,
    supplies: [
      "4 medium bassoon reeds",
      "Reed case (holds at least 4 reeds)",
      "Soaker cup with stand clip",
      "Silk drop swab",
    ],
  },
  {
    name: "Trumpet",
    models: "Bach TR300, Yamaha YTR2330",
    supplies: [
      "Bach 5C mouthpiece",
      "Hetman Synthetic Piston Valve Oil",
      "SpaceFiller Slide Oil (green writing)",
      "Mouthpiece brush",
    ],
  },
  {
    name: "French Horn",
    schoolOwned: true,
    supplies: [
      "Farkas MDC mouthpiece",
      "Hetman Synthetic Light rotor lubricant",
      "SpaceFiller Slide Oil (green writing)",
      "Mouthpiece brush",
    ],
  },
  {
    name: "Trombone",
    models: "Bach TB301, Yamaha YSL-354, Yamaha YSL-448G",
    supplies: [
      "Bach 6½AL mouthpiece",
      "Slide-O All-in-One Rapid Comfort slide lubricant",
      "SpaceFiller Slide Oil (green writing)",
      "Small spray water bottle",
      "Mouthpiece brush",
    ],
  },
  {
    name: "Euphonium",
    schoolOwned: true,
    supplies: [
      "Schilke 51D mouthpiece (small shank)",
      "Hetman Synthetic Piston Valve Oil",
      "SpaceFiller Slide Oil (green writing)",
      "Mouthpiece brush",
    ],
  },
  {
    name: "Tuba",
    schoolOwned: true,
    supplies: [
      "Bach 18 mouthpiece",
      "Hetman Synthetic Piston Valve Oil",
      "SpaceFiller Slide Oil (green writing)",
      "Mouthpiece brush",
    ],
  },
];

const percussionKit = [
  "Yamaha Bell Kit with Roller Cart (YAM-SPK-285R)",
  "Innovative Percussion Chris Lamb Maple Snare Sticks (INN-CL1)",
  "Innovative Percussion James Ross Medium Soft mallets (INN-IP902)",
  "Innovative Percussion Medium Birch Marimba Mallets (IP240)",
  "Innovative Percussion Practice Pad (CP-1R)",
  "Yamaha Black Folding Music Stand with carry bag (YAM-MS1000)",
  "Innovative Percussion Stick Bag (SB-3)",
];

const percussionVendors = [
  { name: "Steve Weiss Music", url: "https://www.steveweissmusic.com" },
  { name: "Percussion Source", url: "https://www.percussionsource.com" },
  { name: "Sam Ash", url: "https://www.samash.com" },
];

export default function SupplyList() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Instrument Supply List
      </h1>

      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <p className="text-lg text-gray-dark leading-relaxed">
            Preferred models and required supplies for each instrument.
            Instruments marked <strong>school-owned</strong> are provided by
            the school for a <strong>$100/year</strong> usage fee &mdash; you
            buy only the accessories listed. See{" "}
            <Link href="/instrument-rental" className="text-primary hover:underline font-medium">
              Instrument Rental
            </Link>{" "}
            for where and how to rent everything else.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Instruments &amp; Supplies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {instruments.map((inst) => (
              <div key={inst.name} className="bg-primary-tint p-6 rounded-lg">
                <div className="flex flex-col gap-1 mb-3">
                  <h3 className="font-semibold text-lg text-primary">{inst.name}</h3>
                  {inst.schoolOwned && (
                    <p className="text-sm font-medium text-gray-dark">
                      School-owned &mdash; $100/year usage fee
                    </p>
                  )}
                </div>
                {inst.models && (
                  <p className="text-gray-dark text-sm mb-1">
                    <strong>
                      {inst.schoolOwned
                        ? "Preferred models (if purchasing your own):"
                        : "Preferred models:"}
                    </strong>{" "}
                    {inst.models}
                  </p>
                )}
                {inst.modelNote && (
                  <p className="text-gray-dark text-sm mb-1">{inst.modelNote}</p>
                )}
                <p className="text-gray-dark text-sm font-medium mt-3 mb-2">
                  Required supplies:
                </p>
                <ul className="space-y-1 text-gray-dark text-sm">
                  {inst.supplies.map((s) => (
                    <li key={s}>&bull; {s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Percussion</h2>
          <div className="bg-primary-tint p-6 rounded-lg">
            <p className="text-sm font-medium text-gray-dark mb-3">
              School-owned &mdash; $100/year usage fee beginning in Year 2
            </p>
            <p className="text-gray-dark text-sm mb-3">
              The school provides the large percussion instruments &mdash;
              families provide the personal kit below.
            </p>
            <p className="text-gray-dark text-sm font-medium mb-2">
              Beginner percussion kit:
            </p>
            <ul className="space-y-1 text-gray-dark text-sm mb-4">
              {percussionKit.map((s) => (
                <li key={s}>&bull; {s}</li>
              ))}
            </ul>
            <p className="text-gray-dark text-sm mb-3">
              Two ways to get the kit: <strong>rent-to-own</strong> it through
              any of the{" "}
              <Link href="/instrument-rental" className="text-primary hover:underline font-medium">
                recommended music stores
              </Link>
              , or <strong>purchase</strong> it from a percussion retailer:
            </p>
            <ul className="space-y-1 text-gray-dark text-sm">
              {percussionVendors.map((v) => (
                <li key={v.name}>
                  &bull;{" "}
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {v.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Every Student Also Needs</h2>
          <div className="bg-primary-tint p-6 rounded-lg">
            <ul className="space-y-2 text-gray-dark">
              <li>
                &bull; The class textbook <strong>&ldquo;Standard of Excellence Book 1&rdquo;</strong>{" "}
                (percussion: <strong>&ldquo;Simple Steps to Successful Beginning Percussion&rdquo;</strong>),
                included in the $25 activity fee &mdash; no separate purchase needed
              </li>
              <li>
                &bull; The band T-shirt uniform, included in the $25 activity fee &mdash; no separate purchase needed
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            A Note to Parents on Purchasing Instruments
          </h2>
          <p className="text-gray-dark leading-relaxed mb-6">
            Buying a band instrument is similar to buying a car. You have your
            choice of something high end and luxurious, something smart and
            dependable, or you can get the old clunker. We want you to get the
            best value for your money, and usually with instruments, you get
            what you pay for. We do not want you to get the most expensive
            instrument you can find. We strongly advise you to stay away from
            the most inexpensive instruments, which are typically found in
            places like the internet or stores that sell other things besides
            music instruments (like department stores). In our experience,
            while these instruments appear to be affordable, the build quality
            is inconsistent and repairs are not always possible. Please only
            purchase instruments from a reputable music store. If you find what
            you think is a good, used instrument in a place such as a pawn
            shop, Facebook marketplace, Craigslist, etc, please send a link to
            the band director first so that they can see if you are getting
            your money&rsquo;s worth. Please try to stick to the brands given
            to you on this list.
          </p>
          <h3 className="text-xl font-semibold mb-4 text-primary" lang="es">
            Una nota para los padres sobre los instrumentos de compra
          </h3>
          <p className="text-gray-dark leading-relaxed" lang="es">
            Comprar un instrumento de banda es similar a comprar un
            autom&oacute;vil. Puede elegir entre algo lujoso y de alta gama,
            algo inteligente y confiable, o puede obtener el viejo cacharro.
            Queremos que obtenga el mejor valor por su dinero y, por lo
            general, con los instrumentos, obtiene lo que paga. No queremos que
            obtenga el instrumento m&aacute;s caro que pueda encontrar. Le
            recomendamos encarecidamente que se mantenga alejado de los
            instrumentos m&aacute;s econ&oacute;micos, que normalmente se
            encuentran en lugares como Internet o tiendas que venden otras
            cosas adem&aacute;s de instrumentos musicales (como los grandes
            almacenes). En nuestra experiencia, si bien estos instrumentos
            parecen ser asequibles, la calidad de construcci&oacute;n es
            inconsistente y no siempre es posible realizar reparaciones.
            Adquiera instrumentos &uacute;nicamente en una tienda de
            m&uacute;sica acreditada. Si encuentra lo que cree que es un buen
            instrumento usado en un lugar como una casa de empe&ntilde;o,
            mercado de Facebook, Craigslist, etc., env&iacute;e primero un
            enlace al director de la banda para que pueda ver si est&aacute;
            obteniendo el valor de su dinero. Intente ce&ntilde;irse a las
            marcas que se le proporcionaron en esta lista.
          </p>
        </section>

        <section className="text-center bg-primary text-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Prefer the Original Document?</h2>
          <p className="mb-6">
            This page mirrors the official supply list. The Google Doc is the
            source of truth.
          </p>
          <a
            href={supplyDocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Open in Google Docs
          </a>
        </section>
      </div>
    </div>
  );
}
