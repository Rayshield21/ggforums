import React, {createRef} from 'react'

const UploadImageButton = ({handleImageInput}) => {
  const imageInput = createRef()
  const handleUploadClick = () => imageInput.current.click()
  const handleInputClick = e => e.target.value = '';
  return (
    <>
      <button type='button' className='btn btn-info mt-3' onClick={handleUploadClick}>Upload Images</button>
      <input onClick={handleInputClick} ref={imageInput} onChange={handleImageInput} className='imageInput' type="file" name="image" accept='image/*'/>
    </>
  )
}

export default UploadImageButton
