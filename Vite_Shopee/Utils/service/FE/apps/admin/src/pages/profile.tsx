import { OGBasePageComponent, OGDetailResources } from '@ss-fe-fw/organisms'
import useResource from '@ss-fe-fw/hooks/use-resource'

function Index({ pathName }) {
  const { resource } = useResource(pathName)

  return (
    <OGBasePageComponent>
      <OGDetailResources resource={resource} />
    </OGBasePageComponent>
  );
}

Index.getInitialProps = async (ctx) => {
  return { pathName: ctx.asPath }
}

export default Index;
