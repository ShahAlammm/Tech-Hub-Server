import { QueryBuilder } from '../../builder/QueryBuilder';
import { UserSearchableFields } from '../User/user.constant';
import { User } from '../User/user.model';

export const SearchItemByUserQueryMaker = async (
  query: Record<string, unknown>
) => {
  if (query?.searchTerm) {
    const userQuery = new QueryBuilder(User.find(), query).search(
      UserSearchableFields
    );

    const users = await userQuery.modelQuery;

    if (users && users.length > 0) {
      const userIds = users.map((user) => user._id);

      query['user'] = { $in: userIds };
      delete query.searchTerm;
      return query;
    }
  }
};
