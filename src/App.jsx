import { useState, useEffect } from "react";

const palette = {
  ink: "#0F0F0E",
  inkSoft: "#1A1917",
  imperial: "#8B2D2D",
  celadon: "#7B9E87",
  celadonMute: "#5C7A65",
  ceramic: "#EDEAE1",
  ceramicDark: "#D4CEC2",
  fog: "#B8B2A6",
  warmWhite: "#FAF8F4",
  text: "#1C1B19",
  textQuiet: "#7A756C",
};

const serif = "'EB Garamond', 'Playfair Display', 'Georgia', serif";
const sans = "'Helvetica Neue', 'Helvetica', sans-serif";

const pieces = [
  {
    id: 1,
    name: "Coupe Dinner Bowl",
    glaze: "Moongate",
    glazeColor: "#c2b5a5",
    image: "/images/coupe-dinner-bowl.jpg",
    price: 48,
    poem: "A bowl for gathering. The Moongate glaze was born here, in this room.",
    story: "Hand-thrown in Sausalito by a team of forty. The Moongate glaze was created for this collaboration alone — inspired by the light that falls through Mister Jiu's windows at dusk. Each piece carries a Yin Yang stamp beneath, invisible until you hold it.",
    fulfillment: "Arriving at your door in a linen-wrapped box, with a note from Chef Brandon Jew.",
  },
  {
    id: 2,
    name: "Small Modern Cup",
    glaze: "Pea Shoot",
    glazeColor: "#7e8e65",
    image: "/images/small-modern-cup.jpg",
    price: 32,
    poem: "For tea. For broth. For the quiet moment between courses.",
    story: "The Pea Shoot glaze takes its name from the greens of Chinatown — the color of morning produce stacked on Stockton Street. A cup designed to be cradled, not gripped.",
    fulfillment: "Wrapped in unbleached linen. Shipped from the original Heath factory in Sausalito.",
  },
  {
    id: 3,
    name: "Covered Serving Dish",
    glaze: "Cedar",
    glazeColor: "#6e5038",
    image: "/images/covered-serving-dish.jpg",
    price: 120,
    poem: "Cedar. Brought back from the archive. A color the earth remembers.",
    story: "This glaze was retired years ago. Brandon asked Heath to bring it back for this collection. The covered dish is meant for family-style dining — for the act of lifting a lid and revealing what's inside.",
    fulfillment: "Arriving at your door in a linen-wrapped box, with a note from Chef Brandon Jew.",
  },
  {
    id: 4,
    name: "Coupe Serving Platter",
    glaze: "Levain",
    glazeColor: "#d1c5af",
    image: "/images/coupe-serving-platter.jpg",
    price: 85,
    poem: "The stage for the duck. This is the platter.",
    story: "If you ordered the Peking-style roast duck tonight, it arrived on this platter. The Levain glaze is warm and creamy — designed to disappear beneath the food, then reappear when the plate is clean.",
    fulfillment: "Wrapped in unbleached linen. Shipped from the original Heath factory in Sausalito.",
  },
  {
    id: 5,
    name: "Coupe Dinner Plate",
    glaze: "Sunflower Gloss",
    glazeColor: "#bfa04a",
    image: "/images/coupe-dinner-plate.jpg",
    price: 42,
    poem: "Golden. Like late afternoon in the Outer Sunset.",
    story: "Heath's Coupe line has been in continuous production since 1948. The Sunflower Gloss is one of the glazes you'll find on the table at Mister Jiu's every night — a classic, not a limited edition.",
    fulfillment: "Arriving at your door in a linen-wrapped box, with a note from Chef Brandon Jew.",
  },
  {
    id: 6,
    name: "Rim Salad Plate",
    glaze: "Sand",
    glazeColor: "#b5a68e",
    image: "/images/rim-salad-plate.jpg",
    price: 36,
    poem: "Sand. The color of Baker Beach at low tide.",
    story: "The Rim line is defined by its raised edge — a subtle frame for whatever is placed upon it. The Sand glaze is neutral in the best sense: it holds space without competing.",
    fulfillment: "Wrapped in unbleached linen. Shipped from the original Heath factory in Sausalito.",
  },
];

function Fade({ children, delay = 0, duration = 800 }) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setV(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(6px)", transition: `opacity ${duration}ms ease, transform ${duration}ms ease` }}>
      {children}
    </div>
  );
}

function CeramicBg({ color = palette.ceramic, children, style = {} }) {
  return (
    <div style={{
      background: color,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Field({ lbl, value, onChange, placeholder, type = "text" }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontFamily: sans, fontSize: 9, fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: palette.fog, marginBottom: 10 }}>{lbl}</p>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width: "100%", padding: "12px 0", background: "none", border: "none",
          borderBottom: `0.5px solid ${palette.ceramicDark}`, fontFamily: serif,
          fontSize: 17, color: palette.text, outline: "none", borderRadius: 0,
          letterSpacing: "0.01em", boxSizing: "border-box",
        }}
      />
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("gallery");
  const [activePiece, setActivePiece] = useState(null);
  const [bag, setBag] = useState([]);
  const [trans, setTrans] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addr, setAddr] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const go = (v, piece = null) => {
    setTrans(true);
    setTimeout(() => {
      setView(v);
      if (piece) setActivePiece(piece);
      setTrans(false);
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 380);
  };

  const addToBag = (p) => {
    const exists = bag.find(i => i.id === p.id);
    if (exists) setBag(bag.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
    else setBag([...bag, { ...p, qty: 1 }]);
  };

  const removeBag = (id) => setBag(bag.filter(i => i.id !== id));
  const total = bag.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div style={{ opacity: trans ? 0 : 1, transition: "opacity 380ms ease", minHeight: "100vh" }}>
      {view === "gallery" && <Gallery pieces={pieces} bag={bag} onSelect={(p) => go("detail", p)} onBag={() => go("bag")} />}
      {view === "detail" && activePiece && <Detail piece={activePiece} bag={bag} onBack={() => go("gallery")} onAdd={(p) => addToBag(p)} onBag={() => go("bag")} />}
      {view === "bag" && <Bag bag={bag} onBack={() => go("gallery")} onRemove={removeBag} onCheckout={() => go("checkout")} total={total} />}
      {view === "checkout" && (
        <Checkout bag={bag} total={total} name={name} email={email} addr={addr} city={city} zip={zip}
          setName={setName} setEmail={setEmail} setAddr={setAddr} setCity={setCity} setZip={setZip}
          onBack={() => go("bag")} onConfirm={() => go("confirmed")} />
      )}
      {view === "confirmed" && (
        <Confirmed name={name} email={email} total={total}
          onDone={() => { setBag([]); setName(""); setEmail(""); setAddr(""); setCity(""); setZip(""); go("gallery"); }} />
      )}
    </div>
  );
}

// ─── GALLERY ───────────────────────────────────────────────────

function Gallery({ pieces, bag, onSelect, onBag }) {
  const bagCount = bag.reduce((s, i) => s + i.qty, 0);

  return (
    <CeramicBg color={palette.ceramic} style={{ minHeight: "100vh" }}>

      {/* Nav */}
      <Fade delay={0} duration={600}>
        <div style={{
          padding: "18px 22px 16px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: `0.5px solid ${palette.ceramicDark}`,
        }}>
          <span style={{ fontFamily: serif, fontSize: 14, color: palette.text, letterSpacing: "0.09em" }}>mesa</span>
          <button onClick={onBag} style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
            color: bagCount > 0 ? palette.text : "transparent",
            transition: "color 300ms ease",
          }}>
            Bag{bagCount > 0 ? ` · ${bagCount}` : ""}
          </button>
        </div>
      </Fade>

      {/* Header */}
      <Fade delay={120} duration={800}>
        <div style={{ textAlign: "center", padding: "32px 24px 8px" }}>
          <p style={{
            fontFamily: sans, fontSize: 9, letterSpacing: "0.28em",
            textTransform: "uppercase", color: palette.celadonMute, marginBottom: 12,
          }}>
            On Your Table at
          </p>
          <h1 style={{
            fontFamily: serif, fontSize: 38, fontWeight: 400,
            color: palette.ink, margin: "0 0 6px", letterSpacing: "0.01em",
          }}>
            Mister Jiu's
          </h1>
          <p style={{ fontFamily: sans, fontSize: 10, fontWeight: 300, color: palette.fog, letterSpacing: "0.1em" }}>
            Chinatown · San Francisco
          </p>
        </div>
      </Fade>

      {/* Maker */}
      <Fade delay={280} duration={800}>
        <div style={{ textAlign: "center", padding: "14px 48px 28px" }}>
          <p style={{
            fontFamily: serif, fontSize: 15, fontWeight: 400, fontStyle: "italic",
            color: palette.textQuiet, lineHeight: 1.75, maxWidth: 300, margin: "0 auto",
          }}>
            Hand-thrown in Sausalito. Glazed in the colors of the fog.
          </p>
        </div>
      </Fade>

      {/* Editorial grid — full bleed, 1px seams */}
      <Fade delay={400} duration={900}>
        <div>

          {/* Row 1: Bowl — landscape hero */}
          <PieceThumb piece={pieces[0]} onSelect={onSelect} aspectRatio="3 / 2" />

          {/* Row 2: Cup + Serving Dish — portrait pair */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, marginTop: 1 }}>
            <PieceThumb piece={pieces[1]} onSelect={onSelect} aspectRatio="3 / 4" />
            <PieceThumb piece={pieces[2]} onSelect={onSelect} aspectRatio="3 / 4" />
          </div>

          {/* Row 3: Platter — cinematic stage */}
          <div style={{ marginTop: 1 }}>
            <PlatterFeature piece={pieces[3]} onSelect={onSelect} />
          </div>

          {/* Row 4: Dinner Plate + Salad Plate — portrait pair */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, marginTop: 1 }}>
            <PieceThumb piece={pieces[4]} onSelect={onSelect} aspectRatio="3 / 4" />
            <PieceThumb piece={pieces[5]} onSelect={onSelect} aspectRatio="3 / 4" />
          </div>

        </div>
      </Fade>

      {/* Quote */}
      <Fade delay={600} duration={700}>
        <div style={{ padding: "52px 32px 24px", textAlign: "center" }}>
          <div style={{ width: 22, height: 0, borderBottom: `0.5px solid ${palette.imperial}`, margin: "0 auto 32px" }} />
          <p style={{
            fontFamily: serif, fontSize: 17, fontWeight: 400, fontStyle: "italic",
            color: palette.ink, lineHeight: 1.85, maxWidth: 340, margin: "0 auto",
          }}>
            "Color, texture, and shape — it all comes together to make a dish feel complete."
          </p>
          <p style={{
            fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
            color: palette.imperial, marginTop: 18,
          }}>
            Brandon Jew · Chef & Owner
          </p>
        </div>
      </Fade>

      {/* Footer */}
      <div style={{ padding: "28px 24px 44px", textAlign: "center", borderTop: `0.5px solid ${palette.ceramicDark}`, marginTop: 16 }}>
        <span style={{ fontFamily: serif, fontSize: 12, color: palette.fog, letterSpacing: "0.07em" }}>mesa</span>
        <p style={{ fontFamily: sans, fontSize: 9, fontWeight: 300, letterSpacing: "0.1em", color: palette.fog, margin: "7px 0 0" }}>
          Mister Jiu's earns a share of every purchase
        </p>
      </div>

    </CeramicBg>
  );
}

// ─── PIECE THUMBNAIL ───────────────────────────────────────────

function PieceThumb({ piece, onSelect, aspectRatio = "3 / 4" }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={() => onSelect(piece)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: "pointer", position: "relative", overflow: "hidden", background: `${piece.glazeColor}16` }}
    >
      {/* Image with scale on hover */}
      <div style={{
        width: "100%",
        aspectRatio: aspectRatio,
        position: "relative",
        transition: "transform 1400ms cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hover ? "scale(1.035)" : "scale(1)",
      }}>
        <img
          src={piece.image}
          alt={piece.name}
          style={{
            position: "absolute",
            top: "7%", left: "7%",
            width: "86%", height: "86%",
            objectFit: "contain",
            transition: "opacity 700ms ease",
            opacity: hover ? 0.9 : 1,
          }}
        />
      </div>

      {/* Text overlay — slides up on hover */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "56px 16px 15px",
        background: `linear-gradient(to bottom, transparent 0%, ${piece.glazeColor}55 100%)`,
        transform: hover ? "translateY(0)" : "translateY(3px)",
        transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <h3 style={{
          fontFamily: serif, fontSize: 13, fontWeight: 400,
          color: palette.ink, margin: "0 0 5px", letterSpacing: "0.02em",
        }}>
          {piece.name}
        </h3>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{
            fontFamily: sans, fontSize: 8, fontWeight: 400,
            color: palette.textQuiet, letterSpacing: "0.14em", textTransform: "uppercase",
          }}>
            {piece.glaze}
          </span>
          <span style={{ fontFamily: sans, fontSize: 12, fontWeight: 300, color: palette.ink }}>
            ${piece.price}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── PLATTER FEATURE — editorial full-width treatment ──────────

function PlatterFeature({ piece, onSelect }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={() => onSelect(piece)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        background: `${piece.glazeColor}18`,
      }}
    >
      {/* Wide cinematic container */}
      <div style={{
        width: "100%",
        aspectRatio: "5 / 2",
        position: "relative",
        transition: "transform 1400ms cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hover ? "scale(1.025)" : "scale(1)",
      }}>
        <img
          src={piece.image}
          alt={piece.name}
          style={{
            position: "absolute",
            top: "8%", left: "8%",
            width: "84%", height: "84%",
            objectFit: "contain",
            transition: "opacity 700ms ease",
            opacity: hover ? 0.9 : 1,
          }}
        />
      </div>

      {/* Editorial overlay — left-aligned, more considered */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        padding: "48px 24px 20px",
        background: `linear-gradient(to bottom, transparent 0%, ${piece.glazeColor}60 100%)`,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <p style={{
              fontFamily: sans, fontSize: 8, fontWeight: 400, letterSpacing: "0.18em",
              textTransform: "uppercase", color: palette.textQuiet, margin: "0 0 6px",
            }}>
              {piece.glaze} Glaze · Heath Ceramics
            </p>
            <h3 style={{
              fontFamily: serif, fontSize: 18, fontWeight: 400,
              color: palette.ink, margin: 0, letterSpacing: "0.01em",
            }}>
              {piece.name}
            </h3>
          </div>
          <span style={{
            fontFamily: serif, fontSize: 20, fontWeight: 400, color: palette.ink,
            opacity: hover ? 1 : 0.7, transition: "opacity 500ms ease",
          }}>
            ${piece.price}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── DETAIL ────────────────────────────────────────────────────

function Detail({ piece, bag, onBack, onAdd, onBag }) {
  const [added, setAdded] = useState(false);
  const bagCount = bag.reduce((s, i) => s + i.qty, 0);

  const handleAdd = () => {
    onAdd(piece);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <CeramicBg color={palette.ceramic} style={{ minHeight: "100vh" }}>

      {/* Nav */}
      <Fade delay={0} duration={500}>
        <div style={{
          padding: "18px 22px 16px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: `0.5px solid ${palette.ceramicDark}`,
        }}>
          <button onClick={onBack} style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: palette.fog,
          }}>← Back</button>
          <span style={{ fontFamily: serif, fontSize: 14, color: palette.text, letterSpacing: "0.09em" }}>mesa</span>
          <button onClick={onBag} style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
            color: bagCount > 0 ? palette.text : "transparent",
          }}>
            Bag{bagCount > 0 ? ` · ${bagCount}` : ""}
          </button>
        </div>
      </Fade>

      {/* Hero — product on stage */}
      <Fade delay={80} duration={700}>
        <div style={{
          width: "100%",
          aspectRatio: "4 / 3",
          background: `${piece.glazeColor}16`,
          position: "relative",
        }}>
          <img
            src={piece.image}
            alt={piece.name}
            style={{
              position: "absolute",
              top: "7%", left: "7%",
              width: "86%", height: "86%",
              objectFit: "contain",
            }}
          />
        </div>
      </Fade>

      {/* Glaze label */}
      <Fade delay={200} duration={700}>
        <div style={{ padding: "24px 28px 0", maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontFamily: sans, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase",
            color: palette.celadonMute, margin: 0,
          }}>
            {piece.glaze} Glaze · Heath Ceramics
          </p>
        </div>
      </Fade>

      {/* Name + poem */}
      <Fade delay={340} duration={700}>
        <div style={{ padding: "12px 28px 0", maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontFamily: serif, fontSize: 30, fontWeight: 400,
            color: palette.ink, margin: "0 0 16px", letterSpacing: "0.01em",
          }}>
            {piece.name}
          </h2>
          <p style={{
            fontFamily: serif, fontSize: 17, fontWeight: 400, fontStyle: "italic",
            color: palette.textQuiet, lineHeight: 1.8, margin: 0,
          }}>
            {piece.poem}
          </p>
        </div>
      </Fade>

      {/* Price */}
      <Fade delay={460} duration={700}>
        <div style={{ padding: "20px 28px 0", maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: serif, fontSize: 22, fontWeight: 400, color: palette.ink, margin: 0 }}>
            ${piece.price}
          </p>
        </div>
      </Fade>

      {/* Story */}
      <Fade delay={580} duration={700}>
        <div style={{ padding: "20px 28px 0", maxWidth: 480, margin: "0 auto" }}>
          <div style={{ width: 18, borderBottom: `0.5px solid ${palette.ceramicDark}`, margin: "0 auto 20px" }} />
          <p style={{
            fontFamily: serif, fontSize: 15, fontWeight: 400, color: palette.textQuiet,
            lineHeight: 1.9, textAlign: "center",
          }}>
            {piece.story}
          </p>
        </div>
      </Fade>

      {/* CTA */}
      <Fade delay={700} duration={700}>
        <div style={{ padding: "32px 28px 0", maxWidth: 480, margin: "0 auto" }}>
          <button onClick={handleAdd} style={{
            display: "block", width: "100%",
            background: added ? palette.celadonMute : palette.ink,
            color: palette.warmWhite, border: "none", padding: "19px 0",
            fontFamily: sans, fontSize: 10, fontWeight: 400,
            letterSpacing: "0.24em", textTransform: "uppercase",
            cursor: "pointer", borderRadius: 0,
            transition: "background 600ms ease",
          }}>
            {added ? "Added  ✓" : "Bring This Home"}
          </button>
        </div>
      </Fade>

      {/* Fulfillment */}
      <Fade delay={820} duration={700}>
        <div style={{ padding: "16px 28px 52px", maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontFamily: serif, fontSize: 13, fontWeight: 400, fontStyle: "italic",
            color: palette.fog, lineHeight: 1.75,
          }}>
            {piece.fulfillment}
          </p>
        </div>
      </Fade>

    </CeramicBg>
  );
}

// ─── BAG ───────────────────────────────────────────────────────

function Bag({ bag, onBack, onRemove, onCheckout, total }) {
  return (
    <CeramicBg color={palette.ceramic} style={{ minHeight: "100vh" }}>
      <Fade delay={0} duration={500}>
        <div style={{ padding: "18px 22px 16px", borderBottom: `0.5px solid ${palette.ceramicDark}` }}>
          <button onClick={onBack} style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: palette.fog,
          }}>← Continue Browsing</button>
        </div>
      </Fade>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "40px 28px" }}>
        <Fade delay={100}>
          <p style={{
            fontFamily: sans, fontSize: 9, letterSpacing: "0.25em",
            textTransform: "uppercase", color: palette.imperial, marginBottom: 36,
          }}>
            Your Bag
          </p>
        </Fade>

        {bag.length === 0 ? (
          <Fade delay={200}>
            <p style={{
              fontFamily: serif, fontSize: 18, fontStyle: "italic",
              color: palette.fog, textAlign: "center", padding: "56px 0",
            }}>
              Nothing here yet.
            </p>
          </Fade>
        ) : (
          <Fade delay={200}>
            <div>
              {bag.map(item => (
                <div key={item.id} style={{
                  display: "flex", alignItems: "center", gap: 18,
                  padding: "22px 0", borderBottom: `0.5px solid ${palette.ceramicDark}`,
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
                    background: `radial-gradient(circle at 38% 35%, ${item.glazeColor}cc, ${item.glazeColor}88)`,
                  }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontFamily: serif, fontSize: 15, fontWeight: 400, color: palette.ink, margin: "0 0 3px" }}>
                      {item.name}
                    </h4>
                    <p style={{ fontFamily: sans, fontSize: 10, fontWeight: 300, color: palette.fog, margin: 0, letterSpacing: "0.05em" }}>
                      {item.glaze} · Qty {item.qty}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontFamily: sans, fontSize: 14, fontWeight: 300, color: palette.text }}>
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                    <button onClick={() => onRemove(item.id)} style={{
                      display: "block", background: "none", border: "none", cursor: "pointer",
                      padding: "5px 0 0", marginLeft: "auto",
                      fontFamily: sans, fontSize: 8, letterSpacing: "0.15em",
                      textTransform: "uppercase", color: palette.fog,
                    }}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 0" }}>
                <span style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: palette.fog }}>
                  Total
                </span>
                <span style={{ fontFamily: serif, fontSize: 24, fontWeight: 400, color: palette.ink }}>
                  ${total.toFixed(2)}
                </span>
              </div>

              <button onClick={onCheckout} style={{
                display: "block", width: "100%", background: palette.ink, color: palette.warmWhite,
                padding: "19px 0", fontFamily: sans, fontSize: 10, fontWeight: 400,
                letterSpacing: "0.24em", textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: 0,
              }}>
                Checkout
              </button>
            </div>
          </Fade>
        )}
      </div>
    </CeramicBg>
  );
}

// ─── CHECKOUT ──────────────────────────────────────────────────

function Checkout({ bag, total, name, email, addr, city, zip, setName, setEmail, setAddr, setCity, setZip, onBack, onConfirm }) {
  const ready = name && email && addr && city && zip;

  return (
    <CeramicBg color={palette.ceramic} style={{ minHeight: "100vh" }}>
      <Fade delay={0} duration={500}>
        <div style={{ padding: "18px 22px 16px", borderBottom: `0.5px solid ${palette.ceramicDark}` }}>
          <button onClick={onBack} style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: palette.fog,
          }}>← Back to Bag</button>
        </div>
      </Fade>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "40px 28px 56px" }}>
        <Fade delay={100}>
          <p style={{
            fontFamily: sans, fontSize: 9, letterSpacing: "0.25em",
            textTransform: "uppercase", color: palette.imperial, marginBottom: 36,
          }}>
            Shipping
          </p>
        </Fade>

        <Fade delay={250}>
          <div>
            <Field lbl="Full Name" value={name} onChange={setName} placeholder="Jane Smith" />
            <Field lbl="Email" value={email} onChange={setEmail} placeholder="jane@email.com" type="email" />
            <Field lbl="Shipping Address" value={addr} onChange={setAddr} placeholder="123 Main St, Apt 4" />
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
              <Field lbl="City" value={city} onChange={setCity} placeholder="San Francisco" />
              <Field lbl="Zip" value={zip} onChange={setZip} placeholder="94110" />
            </div>
          </div>
        </Fade>

        <Fade delay={400}>
          <div style={{ borderTop: `0.5px solid ${palette.ceramicDark}`, paddingTop: 28, marginTop: 4 }}>
            {bag.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontFamily: serif, fontSize: 14, color: palette.textQuiet }}>
                  {item.name} × {item.qty}
                </span>
                <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 300, color: palette.text }}>
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
            <div style={{
              display: "flex", justifyContent: "space-between",
              padding: "20px 0 28px", borderTop: `0.5px solid ${palette.ceramicDark}`, marginTop: 16,
            }}>
              <span style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: palette.fog }}>
                Total
              </span>
              <span style={{ fontFamily: serif, fontSize: 24, fontWeight: 400, color: palette.ink }}>
                ${total.toFixed(2)}
              </span>
            </div>

            <button onClick={ready ? onConfirm : undefined} style={{
              display: "block", width: "100%", background: palette.ink, color: palette.warmWhite,
              padding: "19px 0", fontFamily: sans, fontSize: 10, fontWeight: 400,
              letterSpacing: "0.24em", textTransform: "uppercase", border: "none",
              cursor: ready ? "pointer" : "default", borderRadius: 0,
              opacity: ready ? 1 : 0.28, transition: "opacity 500ms ease",
            }}>
              Place Order
            </button>
          </div>
        </Fade>
      </div>
    </CeramicBg>
  );
}

// ─── CONFIRMED ─────────────────────────────────────────────────

function Confirmed({ name, email, total, onDone }) {
  const firstName = name.split(" ")[0] || "you";

  return (
    <CeramicBg color={palette.ceramic} style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: "56px 32px", maxWidth: 400 }}>
        <Fade delay={200}>
          <div style={{ width: 28, borderBottom: `0.5px solid ${palette.imperial}`, margin: "0 auto 40px" }} />
        </Fade>
        <Fade delay={450}>
          <p style={{
            fontFamily: sans, fontSize: 9, letterSpacing: "0.28em",
            textTransform: "uppercase", color: palette.celadonMute, marginBottom: 20,
          }}>
            Order Placed
          </p>
        </Fade>
        <Fade delay={650}>
          <h2 style={{ fontFamily: serif, fontSize: 30, fontWeight: 400, color: palette.ink, margin: "0 0 22px" }}>
            Thank you, {firstName}.
          </h2>
        </Fade>
        <Fade delay={850}>
          <p style={{
            fontFamily: serif, fontSize: 16, fontWeight: 400, fontStyle: "italic",
            color: palette.textQuiet, lineHeight: 1.85, margin: "0 0 10px",
          }}>
            Your pieces will arrive wrapped in linen, with a note from Chef Brandon Jew.
          </p>
          <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: palette.fog, margin: "0 0 32px" }}>
            Confirmation sent to {email}
          </p>
        </Fade>
        <Fade delay={1050}>
          <p style={{ fontFamily: serif, fontSize: 22, fontWeight: 400, color: palette.ink, margin: "0 0 40px" }}>
            ${total.toFixed(2)}
          </p>
        </Fade>
        <Fade delay={1250}>
          <div style={{ width: 18, borderBottom: `0.5px solid ${palette.imperial}`, margin: "0 auto 22px" }} />
          <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.15em", color: palette.fog, marginBottom: 36 }}>
            Mister Jiu's earns a share of this purchase
          </p>
          <button onClick={onDone} style={{
            background: palette.ink, color: palette.warmWhite, border: "none",
            padding: "16px 52px", fontFamily: sans, fontSize: 10, fontWeight: 400,
            letterSpacing: "0.24em", textTransform: "uppercase", cursor: "pointer", borderRadius: 0,
          }}>
            Done
          </button>
        </Fade>
      </div>
    </CeramicBg>
  );
}
