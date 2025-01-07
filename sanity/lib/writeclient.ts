
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, viewstoken} from '../env'

export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
    token: viewstoken, // Add the token property to include the viewstoken
})
