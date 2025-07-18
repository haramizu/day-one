import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'nypv25ij',
    dataset: 'production',
  },

  studioHost: 'haramizu-day-one',

  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */ autoUpdates: true,
})
