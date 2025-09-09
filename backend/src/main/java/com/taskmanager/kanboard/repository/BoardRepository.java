package com.taskmanager.kanboard.repository;

import com.taskmanager.kanboard.entity.Board;
import com.taskmanager.kanboard.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BoardRepository extends JpaRepository<Board, UUID> {

    List<Board> findByUserOrderByCreatedAtDesc(User user);

    List<Board> findByUserUsernameOrderByCreatedAtDesc(String username);

    Optional<Board> findByIdAndUser(UUID id, User user);

    Optional<Board> findByIdAndUserUsername(UUID id, String username);

    @Query("SELECT b FROM Board b LEFT JOIN FETCH b.columns c LEFT JOIN FETCH c.tasks WHERE b.id = :boardId AND b.user.username = :username")
    Optional<Board> findByIdAndUserUsernameWithColumnsAndTasks(@Param("boardId") UUID boardId,
            @Param("username") String username);

    @Query("SELECT b FROM Board b LEFT JOIN FETCH b.columns c LEFT JOIN FETCH c.tasks WHERE b.id = :boardId")
    Optional<Board> findByIdWithColumns(@Param("boardId") UUID boardId);

    boolean existsByIdAndUser(UUID id, User user);

    boolean existsByIdAndUserUsername(UUID id, String username);

    long countByUser(User user);
}
