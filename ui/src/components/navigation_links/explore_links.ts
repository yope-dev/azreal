import { EuiNavDrawerGroupProps } from '@elastic/eui';

export const buildExploreLinks = (
  makeAction: (path: string) => () => void
): EuiNavDrawerGroupProps['listItems'] => [
  {
    label: 'Користувачі та організації',
    iconType: 'users',
    flyoutMenu: {
      title: 'Користувачі та організації',
      listItems: [
        {
          label: 'Організації',
          onClick: makeAction('/organizations'),
          iconType: 'graphApp'
        },
        {
          label: 'Додати користувача',
          onClick: makeAction('/users/new'),
          iconType: 'createSingleMetricJob'
        },
        {
          label: 'Створити організацію',
          onClick: makeAction('/organizations/new'),
          iconType: 'usersRolesApp'
        }
      ],
    },
  },
  {
    label: 'Датчики',
    onClick: makeAction('/sensors'),
    iconType: 'watchesApp',
    flyoutMenu: {
      title: 'Датчики',
      listItems: [
        {
          label: 'Усі датчики',
          onClick: makeAction('/sensors'),
          iconType: 'outlierDetectionJob'
        },
        {
          label: 'Додатий датчик',
          onClick: makeAction('/sensors/new'),
          iconType: 'createAdvancedJob'
        }
      ],
    },
  },
  {
    label: 'Візуалізація',
    onClick: makeAction('/measurement'),
    iconType: 'visualizeApp',
  },
  {
    label: 'Локації',
    onClick: makeAction('/locations'),
    iconType: 'gisApp',
  },
  {
    label: 'Вимірювальні фактори',
    onClick: makeAction('/factors'),
    iconType: 'metricsApp',
  },
  {
    label: 'Документи',
    onClick: makeAction('/documents'),
    iconType: 'dashboardApp',
  },
  {
    label: 'Журнал',
    onClick: makeAction('/logs'),
    iconType: 'logsApp',
  },
];
