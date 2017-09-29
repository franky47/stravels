import developmentConfig from '@stravels/config/development'
import codePush from '@stravels/config/codePush'

const getDisplayName = (C) => C.displayName || C.name || 'Component'

const createWrapper = (name, wrapper = (C) => C) => {
  return (Component) => {
    const Wrapped = wrapper(Component)
    Wrapped.displayName = `${name}${getDisplayName(Component)}`
    return Wrapped
  }
}

// --

export const wrapReactotronOverlay = createWrapper('ReactotronOverlay', (C) =>
  developmentConfig.useReactotron ? console.tron.overlay(C) : C
)

export const wrapCodePush = createWrapper('CodePush', (C) => codePush(C))
