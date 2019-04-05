// models
import Pin from '../../../models/pin'


export const fetchPins = async query => Pin
  .find(query)
  .sort({ created_at: -1 })
  .exec()

export const savePin = async pin => new Pin(pin)
  .save()

export const deletePin = async query => Pin
  .remove(query)
  .exec()