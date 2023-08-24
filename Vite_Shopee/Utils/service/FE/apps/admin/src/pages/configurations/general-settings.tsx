import useResource from '@ss-fe-fw/hooks/use-resource';
import { OGBasePageComponent } from '@ss-fe-fw/organisms';
import OGTabResources from '../../components/organisms/resources/tab-resources.organism';

function Index({ pathName }) {
  const { resource } = useResource(pathName)

  return (
    <OGBasePageComponent>
      <OGTabResources resource={resource} />
    </OGBasePageComponent>
  );
}

Index.getInitialProps = async (ctx) => {
  return { pathName: ctx.asPath }
}

export default Index;
