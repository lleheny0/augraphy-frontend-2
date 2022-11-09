import _ from "lodash";
import { useState } from "react";
import "./App.css";

const availableInkEffects = {
  inkBleed: "Ink Bleed",
  dustyInk: "Dusty Ink",
  lowInkBlobs: "Low Ink Blobs",
  lowInkPeriodicLines: "Low Ink Periodic Lines",
  lowInkRandomLines: "Low Ink Random Lines",
  bleedthrough: "Bleedthrough",
  brightness: "Brightness",
  dirtyDrum: "Dirty Drum",
  dirtyRollers: "Dirty Rollers",
  letterPress: "Letterpress",
};

const availablePaperEffects = {
  cropAndTile: "Crop and Tile",
  noiseTexturize: "Noise Texturize",
  brightnessTexturize: "Brightness Texturize",
  blur: "Blur",
  subtleNoise: "Subtle Noise",
  watermark: "Watermark",
};

const availablePostEffects = {
  lightingGradient: "Lighting Gradient",
  badPhotoCopy: "Bad Photocopy",
  bindingsAndFasteners: "Bindings and Fasteners",
  bookbinding: "Bookbinding",
  dithering: "Dithering",
  faxify: "Faxify",
  folding: "Folding",
  jpeg: "JPEG",
  pencilScribbles: "Pencil Scribbles",
  markup: "Markup",
};

export default function App() {
  const [inkEffects, setInkEffects] = useState([]);
  const [paperEffects, setPaperEffects] = useState([]);
  const [postEffects, setPostEffects] = useState([]);
  const [image, setImage] = useState(null);

  const state = {
    ink: {
      data: inkEffects,
      set: setInkEffects,
    },
    paper: {
      data: paperEffects,
      set: setPaperEffects,
    },
    post: {
      data: postEffects,
      set: setPostEffects,
    },
  };

  const addEffect =
    (type) =>
    ({ target: { value } }) => {
      const effect = state[type];

      effect.set([...effect.data, value]);
    };

  const clearEffects = (type) => () => state[type].set([]);

  const onSelectImage = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inkEffects, paperEffects, postEffects, image }),
    };

    fetch("http://localhost:8000/crappify", requestOptions).then((response) =>
      response.json()
    );
  };

  return (
    <div className="App">
      <div className="options">
        <div className="column">
          <select className="add-effect" onChange={addEffect("ink")} value="">
            <option default value="">
              Add Ink Effect
            </option>
            {_.map(availableInkEffects, (name, id) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          <div className="effects-list">
            <div className="effects-header">Ink Effects:</div>
            {_.isEmpty(inkEffects)
              ? "(none)"
              : _.map(inkEffects, (effect, index) => (
                  <div key={`${effect}${index}`}>
                    {availableInkEffects[effect]}
                  </div>
                ))}
          </div>

          <button className="clear-button" onClick={clearEffects("ink")}>
            Clear
          </button>
        </div>

        <div className="column">
          <select className="add-effect" onChange={addEffect("paper")} value="">
            <option default value="">
              Add Paper Effect
            </option>
            {_.map(availablePaperEffects, (name, id) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          <div className="effects-list">
            <div className="effects-header">Paper Effects:</div>
            {_.isEmpty(paperEffects)
              ? "(none)"
              : _.map(paperEffects, (effect, index) => (
                  <div key={`${effect}${index}`}>
                    {availablePaperEffects[effect]}
                  </div>
                ))}
          </div>

          <button className="clear-button" onClick={clearEffects("paper")}>
            Clear
          </button>
        </div>

        <div className="column">
          <select className="add-effect" onChange={addEffect("post")} value="">
            <option default value="">
              Add Post Effect
            </option>
            {_.map(availablePostEffects, (name, id) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          <div className="effects-list">
            <div className="effects-header">Post Effects:</div>
            {_.isEmpty(postEffects)
              ? "(none)"
              : _.map(postEffects, (effect, index) => (
                  <div key={`${effect}${index}`}>
                    {availablePostEffects[effect]}
                  </div>
                ))}
          </div>

          <button className="clear-button" onClick={clearEffects("post")}>
            Clear
          </button>
        </div>
      </div>

      <input
        className="upload-button"
        type="file"
        onChange={onSelectImage}
      ></input>

      <button className="submit-button" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
}
