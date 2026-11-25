import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const phone = "tel:+3633440468";
const maps =
  "https://www.google.com/maps/search/?api=1&query=2510+Dorog+Esztergomi+utca+19";
const links = [
  ["Szolgáltatások", "szolgaltatasok"],
  ["Szaküzlet", "szakuzlet"],
  ["Rólunk", "rolunk"],
  ["Referenciák", "referenciak"],
  ["Kapcsolat", "kapcsolat"],
];

function Icon({ name, size = 24, ...props }) {
  const shapes = {
    phone: (
      <path d="m8 3 3 5-3 3a15 15 0 0 0 5 5l3-3 5 3-1 4c-1 3-7 1-12-4S1 5 4 4Z" />
    ),
    pin: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    building: (
      <>
        <path d="M4 21V5h10v16M14 10h6v11M2 21h20M8 9h2M8 13h2M8 17h2M17 14h1M17 18h1" />
      </>
    ),
    plan: (
      <>
        <path d="M4 3h11l5 5v13H4ZM14 3v6h6M8 13h8M8 17h5" />
        <path d="m8 9 1-1" />
      </>
    ),
    shield: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    lightning: <path d="m14 2-9 12h6l-1 8 9-12h-6Z" />,
    light: (
      <>
        <path d="M8 15a7 7 0 1 1 8 0l-1 3H9ZM9 21h6M12 1v2M2 9l2 1M20 10l2-1" />
      </>
    ),
    plug: (
      <>
        <path d="M8 3v5M16 3v5M5 8h14M7 8v4a5 5 0 0 0 10 0V8M12 17v5" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {shapes[name]}
    </svg>
  );
}

function Wordmark() {
  return (
    <span className="wordmark">
      provill<span>ker.</span>
    </span>
  );
}
function Photo({
  name,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 760px) 100vw, 50vw",
}) {
  return (
    <img
      className={className}
      src={`/images/${name}-1280.webp`}
      srcSet={`/images/${name}-640.webp 640w, /images/${name}-1280.webp 1280w, /images/${name}-1920.webp 1920w`}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
function Button({ children, href, secondary = false, icon }) {
  return (
    <a
      className={`button ${secondary ? "button-secondary" : "button-primary"}`}
      href={href}
    >
      {icon && <Icon name={icon} size={19} />} {children}
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const header = useRef(null);
  useEffect(() => {
    function escape(e) {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function outside(e) {
      if (!header.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  return (
    <header className="header" ref={header}>
      <div className="container header-inner">
        <a
          href="#kezdolap"
          aria-label="Provill-Ker Kft. – kezdőlap"
          className="brand"
          onClick={() => setOpen(false)}
        >
          <Wordmark />
        </a>
        <nav
          id="main-navigation"
          className={`navigation ${open ? "is-open" : ""}`}
          aria-label="Fő navigáció"
        >
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a className="mobile-call" href={phone}>
            <Icon name="phone" size={18} /> +36 33 440 468
          </a>
        </nav>
        <a href={phone} className="header-call">
          <Icon name="phone" size={17} /> Hívjon minket
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}

const services = [
  [
    "building",
    "Épületvillamossági kivitelezés",
    "Villamos hálózatok kialakítása és felújítása.",
  ],
  [
    "plan",
    "Villamos tervezés",
    "Villamos rendszerek és világítási megoldások tervezése.",
  ],
  [
    "shield",
    "Villamos biztonsági felülvizsgálatok",
    "Villamos berendezések biztonságának ellenőrzése.",
  ],
  [
    "lightning",
    "Villámvédelem",
    "Villámvédelmi rendszerekhez kapcsolódó szakmai feladatok.",
  ],
  ["light", "Világítástechnika", "Beltéri és kültéri világítási megoldások."],
  [
    "plug",
    "Hálózati csatlakozás",
    "Csatlakozáshoz kapcsolódó szerelési és ügyintézési feladatok.",
  ],
];
const categories = [
  "Vezetékek és kábelek",
  "Kapcsolók és szerelvények",
  "Kismegszakítók",
  "Elosztódobozok",
  "Fényforrások",
  "Világítástechnika",
];

function App() {
  return (
    <>
      <a className="skip-link" href="#tartalom">
        Ugrás a tartalomra
      </a>
      <Header />
      <main id="tartalom">
        <section className="hero" id="kezdolap" aria-labelledby="hero-title">
          <div className="hero-photo">
            <Photo
              name="hero"
              alt="Villanyszerelő dolgozik egy villamos elosztószekrénynél – illusztráció"
              priority
              sizes="(max-width: 760px) 100vw, 60vw"
            />
          </div>
          <div className="container hero-inner">
            <div className="hero-content">
              <p className="eyebrow">
                <span className="small-line" /> Villamossági szaküzlet és
                kivitelezés · Dorog
              </p>
              <h1 id="hero-title">
                Villamossági
                <br />
                megoldások
                <br />
                <span>egy helyen.</span>
              </h1>
              <p className="hero-description">
                Villamossági termékek, épületvillamossági kivitelezés és szakmai
                szolgáltatások Dorogon. A tervezéstől az anyagbeszerzésen át a
                megvalósításig.
              </p>
              <div className="button-row">
                <Button href="#szolgaltatasok">Szolgáltatásaink</Button>
                <Button href="#szakuzlet" secondary>
                  Szaküzletünk
                </Button>
              </div>
            </div>
            <div className="hero-caption">
              <span className="caption-line" /> Szakértelem a tervezéstől a
              kivitelezésig.
            </div>
          </div>
        </section>

        <div className="info-strip">
          <div className="container info-inner">
            <a href={maps}>
              <Icon name="pin" />
              <span>
                <strong>Dorogon megtalál minket</strong>
                <span>Esztergomi u. 19.</span>
              </span>
            </a>
            <div>
              <Icon name="clock" />
              <span>
                <strong>Hétköznap már 7 órától</strong>
                <span>H–P: 7:00–16:00 · Szo: 8:00–12:00</span>
              </span>
            </div>
            <a href={phone}>
              <Icon name="phone" />
              <span>
                <strong>Beszéljük meg telefonon</strong>
                <span>+36 33 440 468</span>
              </span>
            </a>
          </div>
        </div>

        <section className="section business-areas">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Kereskedelem és kivitelezés</p>
                <h2>
                  Két terület,
                  <br />
                  egy szakmai háttér.
                </h2>
              </div>
              <p>
                Anyagbeszerzés vagy teljes kivitelezés?
                <br />
                Nálunk mindkettőhöz megtalálja a szakmai segítséget.
              </p>
            </div>
            <div className="area-grid">
              <article className="area-card">
                <div className="area-image">
                  <Photo
                    name="bolt"
                    alt="Villamossági termékek üzleti polcokon – illusztráció"
                  />
                </div>
                <div className="area-copy">
                  <span className="card-label">Termékek és szaktanácsadás</span>
                  <h3>Villamossági szaküzlet</h3>
                  <p>
                    Vezetékek, kábelek, kapcsolók, szerelvények,
                    világítástechnikai és egyéb villamossági termékek dorogi
                    üzletünkben.
                  </p>
                  <a className="text-link" href="#szakuzlet">
                    Ismerje meg szaküzletünket{" "}
                    <span className="link-mark" aria-hidden="true">
                      +
                    </span>
                  </a>
                </div>
              </article>
              <article className="area-card">
                <div className="area-image">
                  <Photo
                    name="szolg"
                    alt="Kismegszakítók és villamos szerelési munka – illusztráció"
                  />
                </div>
                <div className="area-copy">
                  <span className="card-label">
                    Tervezéstől a megvalósításig
                  </span>
                  <h3>Épületvillamossági kivitelezés</h3>
                  <p>
                    Villamos hálózatok tervezése és kivitelezése lakossági és
                    ipari környezetben.
                  </p>
                  <a className="text-link" href="#szolgaltatasok">
                    Fedezze fel szolgáltatásainkat{" "}
                    <span className="link-mark" aria-hidden="true">
                      +
                    </span>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section services" id="szolgaltatasok">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Szolgáltatásaink</p>
              <h2>
                Szakmai megoldások
                <br />a villamosság területén.
              </h2>
            </div>
            <div className="service-grid">
              {services.map(([icon, title, description]) => (
                <article className="service-card" key={title}>
                  <Icon name={icon} size={32} />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <div className="services-bottom">
              <p>Egyeztessünk az Ön elképzeléseiről.</p>
              <a href={phone}>
                <Icon name="phone" size={18} /> +36 33 440 468
              </a>
            </div>
          </div>
        </section>

        <section className="section store" id="szakuzlet">
          <div className="container store-grid">
            <div className="store-visual">
              <Photo
                name="bolt"
                alt="Villamossági szaküzlet polcai, szerelési termékekkel – illusztráció"
              />
              <div className="address-tag">
                <Icon name="pin" size={26} />
                <div>
                  <strong>Találkozzunk Dorogon!</strong>
                  <span>2510 Dorog, Esztergomi u. 19.</span>
                </div>
              </div>
            </div>
            <div className="store-copy">
              <p className="eyebrow">Dorogi szaküzlet</p>
              <h2>
                Villamossági termékek,
                <br />
                szakmai segítséggel.
              </h2>
              <p>
                Dorogi villamossági szaküzletünkben a mindennapi szerelési
                munkákhoz és nagyobb projektekhez szükséges termékekből is
                válogathat. Vásárlóinkat szakmai segítséggel és villamossági
                termékek széles választékával várjuk.
              </p>
              <ul className="categories">
                {categories.map((category) => (
                  <li key={category}>{category}</li>
                ))}
              </ul>
              <div className="store-hours">
                <Icon name="clock" size={20} />
                <div>
                  <strong>Nyitvatartás</strong>
                  <p>
                    H–P: 7:00–16:00 <span>|</span> Szombat: 8:00–12:00{" "}
                    <span>|</span> Vasárnap: Zárva
                  </p>
                </div>
              </div>
              <Button href={maps} icon="pin">
                Útvonaltervezés
              </Button>
            </div>
          </div>
        </section>

        <section className="section about" id="rolunk">
          <div className="container about-grid">
            <div className="about-copy">
              <p className="eyebrow">Provill-Ker Kft.</p>
              <h2>
                Szakmai tapasztalat,
                <br />
                több területen.
              </h2>
              <p>
                A Provill-Ker Kft. 2007-ben alakult újjá, folytatva a villamos
                szerelési ipar és a világítástechnika területén kialakult
                hagyományokat. Tevékenységünk a villamossági termékek
                kereskedelmére, villamos rendszerek tervezésére, kivitelezésére
                és felülvizsgálatára egyaránt kiterjed.
              </p>
              <div className="year-detail">
                <strong>2007</strong>
                <span>
                  A társaság
                  <br />
                  újjáalakulása
                </span>
              </div>
            </div>
            <div className="about-visual">
              <Photo
                name="kapcs"
                alt="Villanyszerelési kéziszerszámok – illusztráció"
              />
            </div>
          </div>
        </section>

        <section className="section references" id="referenciak">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Referenciák</p>
                <h2>Munkáinkból</h2>
              </div>
              <p>
                Korábbi munkáink között lakossági és ipari villamossági
                feladatok egyaránt megtalálhatók.
              </p>
            </div>
            <div className="reference-grid">
              {[
                ["Családi ház – Sárisáp", "Lakossági referencia"],
                [
                  "Magyar Honvédség – számítógépes lőterek",
                  "Kiépítés és felújítás",
                ],
                [
                  "Reflex autójavító és ONYX Hungária Kft.",
                  "Könnyűszerkezetes csarnokok",
                ],
              ].map(([title, label]) => (
                <article className="reference-card" key={title}>
                  <span className="reference-type">{label}</span>
                  <h3>{title}</h3>
                  <span className="reference-rule" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact" id="kapcsolat">
          <div className="container">
            <div className="contact-top">
              <div>
                <p className="eyebrow">Lépjen velünk kapcsolatba</p>
                <h2>
                  Villamossági kérdésben
                  <br />
                  keres megoldást?
                </h2>
                <p>
                  Keressen minket telefonon, vagy látogasson el dorogi
                  szaküzletünkbe!
                </p>
              </div>
              <div className="contact-actions">
                <Button href={phone} icon="phone">
                  Hívjon minket
                </Button>
                <Button href={maps} secondary icon="pin">
                  Útvonaltervezés
                </Button>
              </div>
            </div>
            <div className="contact-details">
              <div>
                <Icon name="pin" />
                <h3>Provill-Ker Kft.</h3>
                <address>
                  2510 Dorog,
                  <br />
                  Esztergomi u. 19.
                </address>
              </div>
              <div>
                <Icon name="phone" />
                <h3>Telefon</h3>
                <a className="contact-number" href={phone}>
                  +36 33 440 468
                </a>
                <p>Hívjon minket nyitvatartási időben.</p>
              </div>
              <div>
                <Icon name="clock" />
                <h3>Nyitvatartás</h3>
                <dl>
                  <div>
                    <dt>Hétfő–péntek</dt>
                    <dd>7:00–16:00</dd>
                  </div>
                  <div>
                    <dt>Szombat</dt>
                    <dd>8:00–12:00</dd>
                  </div>
                  <div>
                    <dt>Vasárnap</dt>
                    <dd>Zárva</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <a
              className="brand"
              href="#kezdolap"
              aria-label="Provill-Ker Kft. – kezdőlap"
            >
              <Wordmark />
            </a>
            <nav aria-label="Lábléc navigáció">
              {links.map(([label, id]) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
            </nav>
            <a href={phone}>+36 33 440 468</a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Provill-Ker Kft.</span>
            <span>2510 Dorog, Esztergomi u. 19.</span>
            <span>A képek illusztrációk.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
