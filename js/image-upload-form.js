import { isEscapeKey } from './util.js';
import { sliderElement } from './slider-element.js';
import { sendData } from './api.js';
import { showSuccessTemplate, showErrorTemplate } from './response.js';

const imageForm = document.querySelector('.img-upload__form');
const imgUploadInput = imageForm.querySelector('#upload-file');
const imageEditingForm = imageForm.querySelector('.img-upload__overlay');
const closeEditorFormButton = imageForm.querySelector('#upload-cancel');
const decreaseButton = imageEditingForm.querySelector('.scale__control.scale__control--smaller');
const increaseButton = imageEditingForm.querySelector('.scale__control.scale__control--bigger');
const scaleField = imageEditingForm.querySelector('.scale__control.scale__control--value');
const imageScale = imageEditingForm.querySelector('[data-preview-image="image"]');
const pictureEffectButtons = imageEditingForm.querySelectorAll('.effects__radio');
const textArea = imageEditingForm.querySelector('.text__description');
const imgButtonSubmit = imageEditingForm.querySelector('.img-upload__submit');

const photo = imageForm.querySelector('[data-preview-image="image"]');
const radioButtonsPhotos = imageForm.querySelectorAll('.effects__preview');

const DefaultValues = {
  NOTATION: 10,
  SCALE_VALUE: 100,
  TRANSFORM_SCALE: 1
};

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageEditingForm();
  }
}

function openImageEditingForm() {
  imageEditingForm.classList.remove('hidden');
  imageScale.className = '';
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeImageEditingForm() {
  imageEditingForm.classList.add('hidden');
  sliderElement.classList.add('hidden');
  imageScale.className = '';
  imageScale.style.transform = `scale(${DefaultValues.TRANSFORM_SCALE})`;
  imageScale.style.filter = '';
  scaleField.value = `${DefaultValues.SCALE_VALUE}%`;
  imgUploadInput.value = '';
  pictureEffectButtons[0].checked = true;
  textArea.value = '';
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
}

imgUploadInput.addEventListener('change', openImageEditingForm);

imgUploadInput.addEventListener('change', (evt) => {
  const url = URL.createObjectURL(evt.target.files[0]);
  radioButtonsPhotos.forEach((item) => {item.style.backgroundImage = `url('${url}')`;});
  photo.src = url;
});

closeEditorFormButton.addEventListener('click', closeImageEditingForm);

closeEditorFormButton.addEventListener('keydown', onPopupEscKeydown);

decreaseButton.addEventListener('click', () => {
  const currentScale = Number.parseInt(scaleField.value, DefaultValues.NOTATION);
  const minValue = Number.parseInt(scaleField.min, DefaultValues.NOTATION);
  const stepValue = Number.parseInt(scaleField.step, DefaultValues.NOTATION);
  if (!Number.isNaN(currentScale) && !Number.isNaN(minValue) && !Number.isNaN(stepValue)) {
    if (currentScale > minValue) {
      const newScale = currentScale - stepValue;
      scaleField.value = `${newScale}%`;
      imageScale.style.transform = `scale(${newScale / DefaultValues.SCALE_VALUE})`;
    }
  } else {
    throw new Error('NaN - число в разметке не найдено');
  }
});

increaseButton.addEventListener('click', () => {
  const currentScale = Number.parseInt(scaleField.value, DefaultValues.NOTATION);
  const maxValue = Number.parseInt(scaleField.max, DefaultValues.NOTATION);
  const stepValue = Number.parseInt(scaleField.step, DefaultValues.NOTATION);
  if (!Number.isNaN(currentScale) && !Number.isNaN(maxValue) && !Number.isNaN(stepValue)) {
    if (currentScale < maxValue) {
      const newScale = currentScale + stepValue;
      scaleField.value = `${newScale}%`;
      imageScale.style.transform = `scale(${newScale / DefaultValues.SCALE_VALUE})`;
    }
  } else {
    throw new Error('NaN - число в разметке не найдено');
  }
});

pictureEffectButtons.forEach((radio) => {
  radio.addEventListener('change', () => {
    const elementId = radio.id;
    const classEffect = imageEditingForm.querySelector(`[for=${elementId}]`).querySelector('.effects__preview');
    imageScale.className = '';
    imageScale.classList.add(`${classEffect.classList[1]}`);
  });
});

function blockSubmitButton() {
  imgButtonSubmit.disabled = true;
  imgButtonSubmit.textContent = 'Публикую...';
}

function unblockSubmitButton() {
  imgButtonSubmit.disabled = false;
  imgButtonSubmit.textContent = 'Опубликовать';
}

function handleSubmit(onSuccess) {
  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    blockSubmitButton();

    sendData(
      () => {
        onSuccess();
        unblockSubmitButton();
        showSuccessTemplate();
      },
      () => {
        document.removeEventListener('keydown', onPopupEscKeydown);
        showErrorTemplate();
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  });
}

export { handleSubmit, closeImageEditingForm };
